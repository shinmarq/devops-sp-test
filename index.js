const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(bodyParser.json());

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

// Database logic replica
const db = {};

app.get('/api/health', (req, res) => {
  res.json({ "status": "ok" });
});

app.get('/api/mirror', (req, res) => {
  const word = req.query.word;

  // Transform the word
  const transformed = word
    .split('')
    .map((char) => {
      if (char >= 'a' && char <= 'z') {
        return char.toUpperCase();
      } else if (char >= 'A' && char <= 'Z') {
        return char.toLowerCase();
      } else {
        return char;
      }
    })
    .reverse()
    .join('');

  // Save word and mirrored word in the database
  db[word] = transformed;

  res.json({ "transformed": transformed });
});
  
// Create a new instance of the S3 client
const s3 = new AWS.S3();
  
app.post('/api/upload-random', (req, res) => {
    uploadRandomNumber();
    res.json({ "message": "Random number uploaded" });
});

app.get('/api/test', (req, res) => {
  // Retrieve the mirrored word from the database
  const mirroredWord = db['fOoBar25'];

  res.json({ "mirroredWord": mirroredWord });
});

function uploadRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const fileName = 'numbers.txt';

    // Add logic to generate the file with the random number here
    const fileContent = randomNumber.toString();

    // Configure parameters for the S3 upload
    const params = {
        Bucket: 'your-bucket-name',
        Key: fileName,
        Body: fileContent,
    };

    // Upload the file to S3
    s3.upload(params, function(err, data) {
        if (err) {
        console.error('Error uploading file:', err);
        } else {
        console.log('File uploaded successfully');
        }
    });
}

app.listen(4004, () => {
  console.log('Server running on port 4004');
});

