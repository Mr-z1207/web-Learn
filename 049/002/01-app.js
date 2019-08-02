const express = require('express')

const app = express()

const port = 3000


app.use(express.static('public'));

// app.get('/get', (req, res) => res.send('Hello get!'))

app.get('/', function (req, res) {
  res.send(req.params)
})

app.post('/', (req, res) => res.send('Hello post!'))
app.put('/', (req, res) => res.send('Hello put!'))
app.delete('/', (req, res) => res.send('Hello delete!'))

app.listen(port, 
	() => console.log(`Example app listening on port ${port}!`))