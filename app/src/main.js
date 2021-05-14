const express = require('express');
const path = require('path');
const app = express();
const staticPath = path.join(__dirname,'../public');
app.use(express.static(staticPath));

app.get('/', (req, res) =>{
    res.sendFile(path.join(staticPath, '/home.html'));
    res.send();
});

app.get('/login', (req, res) =>{
    res.send();
});
app.listen(100,() =>{
console.log('listening on http://127.0.0.1:100');
});