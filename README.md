# LinksProbe – Safe Link Checker

LinksProbe is an open-source web app that helps users check if a website link is safe or malicious.  
It uses the Google Safe Browsing API and is built with Next.js 16 (TypeScript) for the frontend and Express (Node.js) for the backend.

## About the Project

The frontend allows users to enter any URL.  
The backend sends that URL to the Google Safe Browsing API, which returns whether it contains malware, phishing, or other harmful content.  
The result is displayed to the user as Safe or Not Safe.

## Technologies Used

### Frontend

- Next.js 16
- TypeScript
- Axios

### Backend

- Node.js
- Express
- Google Safe Browsing API

## Getting Started

### 1. Clone the Repository

git clone https://github.com/kennethnnabuife/links-probe
cd links-probe

Backend repository:  
https://github.com/kennethnnabuife/links-probe-backend

If your frontend and backend are in separate folders, navigate to each one when needed.

### 2. Install Dependencies

For the frontend:
cd frontend
npm install

For the backend:
cd backend
npm install

### 3. Environment Variables

Create a file named `.env` inside the frontend folder and add:

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/scan

Do not commit this file to GitHub.

### 4. Running the Servers

Start the backend:
cd backend
npm run dev

Start the frontend:
cd frontend
npm run dev

Then open your browser at:  
http://localhost:3000

## How It Works

1. The user enters a website link into the search box on the frontend.
2. The frontend sends the link to the backend API endpoint `/scan`.
3. The backend checks the link using Google Safe Browsing.
4. The result is sent back to the frontend and displayed.

## Test Links

Unsafe test links:

- https://testsafebrowsing.appspot.com/s/malware.html
- https://testsafebrowsing.appspot.com/s/phishing.html
- https://testsafebrowsing.appspot.com/s/unwanted.html

Safe test link:

- https://www.google.com
- or any other site of your choice.

## Contributing

1. Fork the project
2. Create a new branch for your feature
3. Commit and push your changes
4. Open a pull request

Everyone is welcome to contribute or suggest improvements.

## License

MIT License  
Copyright (c) Kenneth Nnabuife

## Learn More

- Next.js Documentation: https://nextjs.org/docs
- TypeScript Documentation: https://www.typescriptlang.org/docs
- Google Safe Browsing API: https://developers.google.com/safe-browsing
