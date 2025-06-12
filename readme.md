# FreakyFashion Backend

A Node.js/Express backend application for managing an e-commerce fashion store with an admin interface.

## Features

- Admin dashboard for product management
- Product listing and management
- SQLite database integration
- EJS templating engine
- Responsive admin interface
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yas-amini/FreakyFashion-Backend-1
cd FreakyFashion-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
FreakyFashion-Backend/
├── bin/                # Server startup scripts
├── config/            # Configuration files
├── data/              # SQLite database files
├── public/            # Static assets
├── routes/            # Route handlers
├── views/             # EJS templates
├── app.js            # Main application file
└── package.json      # Project dependencies
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## Dependencies

- Express.js - Web framework
- EJS - Template engine
- SQLite3 - Database
- Express EJS Layouts - Layout support
- Cookie Parser - Cookie handling
- Morgan - HTTP request logger

## Development

The application uses:

- Express.js for the backend framework
- EJS for view templating
- SQLite for the database
- Bootstrap 5 for the admin interface styling
- Font Awesome for icons

## Admin Interface

The admin interface is accessible at `/admin` and includes:

- Product management
- Product listing
- Add/Edit/Delete product functionality

## License

This is a student project created for educational purposes only.

## Author

[Yasamin Amini]
