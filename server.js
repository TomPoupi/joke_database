const express = require('express');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('jokes-en.json', 'utf-8'));

const app = express();


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

app.get('/jokes/:category/:amount', (req, res) => {
  const { category, amount } = req.params;

  const jokes = data.jokes.filter(joke => joke.category === category && joke.type === 'single'); 
  const randomJokes = getRandom(jokes, amount);
  result = {
    error: false,
    amount: amount,
    jokes: randomJokes
  }
  res.json(result);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});