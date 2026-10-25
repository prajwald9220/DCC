const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'DCC';
const COLLECTION = 'Feedback';

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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const client = await connectToDatabase();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        // GET — sirf approved feedback
        if (event.httpMethod === 'GET') {
            const list = await collection.find({ status: 'approved' }).sort({ date: -1 }).limit(50).toArray();
            return { statusCode: 200, headers, body: JSON.stringify(list) };
        }

        // POST — naya feedback (pending)
        if (event.httpMethod === 'POST') {
            const data = JSON.parse(event.body);

            if (!data.name || !data.msg || !data.rating) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
            }

            const now = new Date();

            const doc = {
                name: String(data.name).trim(),
                phone: String(data.phone || '').trim(),
                type: String(data.type || '').trim(),
                rating: Number(data.rating),
                msg: String(data.msg).trim(),
                date: now.toISOString(),
                submittedAt: formatIST(now),
                status: 'pending'
            };

            await collection.insertOne(doc);
            return { statusCode: 200, headers, body: JSON.stringify({ ok: true, message: 'Feedback submitted for review' }) };
        }

        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    } catch (err) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error', details: err.message }) };
    }
};