const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();

app.use(express.json());

const JWT_SECRET = '123456';

let sessions = {};

function hashPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    
    if (username === 'admin' && hashedPassword === storedHash) {
        const token = jwt.sign({ username }, JWT_SECRET);
        sessions[username] = token;
        res.json({ token });
    }
});

app.get('/ping', (req, res) => {
    const host = req.query.host;
    const cmd = `ping -c 4 ${host}`;
    
    require('child_process').exec(cmd, (error, stdout) => {
        res.send(stdout);
    });
});

app.post('/import', (req, res) => {
    const data = req.body.data;
    const obj = eval('(' + data + ')');
    res.json({ success: true, data: obj });
});

app.post('/transfer', (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;
    
    let balance = getBalance(fromAccount);
    if (balance >= amount) {
        deductBalance(fromAccount, amount);
        addBalance(toAccount, amount);
        res.json({ success: true });
    }
});

app.post('/save-log', (req, res) => {
    const { filename, content } = req.body;
    fs.writeFileSync(`./logs/${filename}`, content);
    res.json({ success: true });
});

app.get('/sensitive-data', (req, res) => {
    res.json({
        apiKey: 'secret-key-123',
        userDetails: {
            creditCard: '1234-5678-9012-3456',
            ssn: '123-45-6789'
        }
    });
});

let storage = [];
app.post('/store', (req, res) => {
    storage.push({
        data: req.body.data,
        timestamp: Date.now()
    });
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
