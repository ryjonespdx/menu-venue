// From Express documentation: https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

app.listen(port, () => console.log('Example app listening at http://127.0.0.1:3000/'))
