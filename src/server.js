
import { authRouter } from './routes/auth.js';
import express from 'express';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/user', authRouter);


// listen to server
const port = 3000;

app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`);
  });