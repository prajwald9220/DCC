# Deshmukh Civil Construction

Website for Deshmukh Civil Construction, a Nagpur-based civil contractor with 25+ years of experience in house construction, renovation, repair and interior finishing.

👉 **[Explore the live website](https://deshmukhcivilconstruction.netlify.app)**

## Features

- Responsive website with services, portfolio, why-choose-us and client reviews sections.
- "Request a Free Estimate" form: Rvery enquiry is saved to MongoDB and emailed to the owner instantly.
- Client feedback form: submissions are stored as pending and appear on the site only after the owner approves them.
- Mobile-friendly navigation, call and WhatsApp buttons.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js serverless functions (Netlify Functions)
- **Database:** MongoDB Atlas
- **Email:** Nodemailer (Gmail)
- **Hosting:** Netlify, with the code on GitHub

## Project Structure

    DCC/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── images/
    ├── netlify/
    │   └── functions/
    │       ├── contact.js      (saves enquiry to MongoDB + sends email)
    │       └── feedback.js     (saves and serves approved feedback)
    ├── netlify.toml
    └── package.json

## Environment Variables

Set these in Netlify (Site configuration → Environment variables). Never commit real values to the repository.

| Name | Purpose |
|------|---------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `GMAIL_USER` | Gmail address used to send enquiry emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password for that account |

## How It Works

1. A visitor submits the enquiry form, which sends a request to `/api/contact`.
2. The Netlify function saves the enquiry in the `Contacts` collection and emails the owner.
3. Feedback goes to `/api/feedback` and is saved in the `Feedback` collection with status `pending`. Once the owner changes it to `approved` in MongoDB, it shows on the website.

## Notes

Built with the help of AI tools. I customised the design and content and set up the database, email notifications and deployment.
