const path = require('path')
const express = require('express')

const port = process.env.PORT||3000;
const app = express()

app.use(express.static(path.join(__dirname,'../public')))


app.listen(port,()=>{
    console.log(`App is live on port ${port}`)
})