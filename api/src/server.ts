import express from 'express'

const app = express();

app.get('/test', (req, res) => {
    res.send("oi")
})

app.post('/test', (req, res) => {
    res.json({msg: "oi"})
})

app.listen(3333, () => console.log("server running"));