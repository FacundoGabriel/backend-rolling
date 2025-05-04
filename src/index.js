const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

app.use('/api/usuarios', require('./routes/usuarios.routes'))

app.listen(port, ()=> {
    console.log('servidor prendido en el puerto: ', port)
})