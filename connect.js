// WARNING: This code contains intentional vulnerabilities for educational purposes
// DO NOT use in production environments

const express = require('express');
const mysql = require('mysql');
const app = express();

// Vulnerable database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',  // Hardcoded credentials (bad practice)
    database: 'userdb'
});

// Vulnerable to SQL Injection
app.get('/user', (req, res) => {
    const userId = req.query.id;
    // Unsafe direct concatenation of user input
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Vulnerable to XSS (Cross-Site Scripting)
app.get('/profile', (req, res) => {
    const userInput = req.query.name;
    // Unsafe direct rendering of user input
    res.send(`<h1>Welcome ${userInput}!</h1>`);
});

// Vulnerable to Path Traversal
app.get('/download', (req, res) => {
    const fileName = req.query.file;
    // Unsafe direct use of user input in file paths
    const filePath = __dirname + '/files/' + fileName;
    res.sendFile(filePath);
});

// Information Exposure
app.get('/error', (req, res) => {
    try {
        throw new Error('Database connection failed');
    } catch (err) {
        res.status(500).json({ error: err.stack });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});