var btn = document.getElementById("btn");

btn.addEventListener('click', function() {
    window.location.href = "https://lichess.org/@/kewin3";
});

// Import the http module
const http = require('http');

// Configure the HTTP server to respond with "Hello, World!" to all requests
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// Listen on port 3000 and IP address 127.0.0.1
const PORT = 3000;
const IP = 'https://kewin33.github.io';
server.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});
