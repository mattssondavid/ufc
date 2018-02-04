import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.static('client'));

app.listen(process.env.PORT || 8080);
