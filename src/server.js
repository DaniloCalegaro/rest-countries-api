var express = require('express')
var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
//app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
   res.render('pages/index')
})

app.listen(8080)
console.log('Server running in port 8080')
//start server -> node server
