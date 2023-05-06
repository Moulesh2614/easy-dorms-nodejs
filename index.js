const http = require('http');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://moulesh:choudhury@newcluster.p5mnff5.mongodb.net/test';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connection Established');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  return client;
}

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/api') {
    const client = await main();
    const cursor = client.db('easy-dorms').collection('dormsCollection').find({});
    const results = await cursor.toArray();
    console.log(results);
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(results));
    await client.close();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(' <h1> 404 Nothing Found </h1>');
  }
});

server.listen(3000, () => console.log('Our server is running'));
