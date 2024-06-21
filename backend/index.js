import cors from 'cors';
import express from 'express';
import config from './config.js';
import productRoute from './routes/productRoutes.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use('/api', productRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
