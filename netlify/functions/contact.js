const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const MONGO_URI = process.env.MONGO_URI;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const DB_NAME = 'DCC';
const COLLECTION = 'Contacts';
const TO_EMAIL = 'deshmukhcivilconstruction1111@gmail.com';

let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) return cachedClient;
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

function formatIST(d) {
    const s = d.toLocaleString('en-GB', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return s.replace('AM', 'am').replace('PM', 'pm');
}

exports.handler = async(event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const data = JSON.parse(event.body);

        if (!data.name || !data.phone) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
        }

        const now = new Date();

        const doc = {
            name: String(data.name).trim(),
            phone: String(data.phone).trim(),
            location: String(data.location || '').trim(),
            service: String(data.service || '').trim(),
            message: String(data.message || '').trim(),
            date: now.toISOString(),
            submittedAt: formatIST(now)
        };

        // 1. MongoDB me save
        const client = await connectToDatabase();
        await client.db(DB_NAME).collection(COLLECTION).insertOne(doc);

        // 2. Gmail se email bhejo
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
            });

            await transporter.sendMail({
                from: `"DCC Website" <${GMAIL_USER}>`,
                to: TO_EMAIL,
                subject: `New Enquiry: ${doc.name} - ${doc.phone}`,
                text: `New Enquiry from Website

Name: ${doc.name}
Phone: ${doc.phone}
Location: ${doc.location}
Service: ${doc.service}
Message: ${doc.message}
Time: ${doc.submittedAt}`
            });
        } catch (mailErr) {
            console.error('MAIL ERROR:', mailErr);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ ok: true, message: 'Enquiry submitted' })
        };
    } catch (err) {
        console.error('CONTACT ERROR:', err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Server error', details: err.message })
        };
    }
};