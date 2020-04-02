require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const massive = require('massive')
const ctrl = require('./controller')
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.post('/api/products', ctrl.addProduct)
app.get('/api/products', ctrl.getProducts)
app.delete('/api/products/:id', ctrl.delete)
app.get(`/api/product/:id`, ctrl.getOneProduct)
app.put(`/api/products/:id`, ctrl.update)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('connected')
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))
}).catch(err => console.log(err, `Can't connect to the database`))

