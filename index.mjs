import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.static('static'));

app.listen(process.env.PORT || 8080);
