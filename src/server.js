const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.render('pages/index.ejs')
})

app.listen(8080, () => console.log('Server running in port 8080'))

// start server -> node server or npm start
