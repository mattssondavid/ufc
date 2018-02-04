import express from 'express';

const app = express()

app.use(express.static('client'))

app.listen(process.env.PORT || 8080)
