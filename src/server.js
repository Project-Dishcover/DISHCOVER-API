
import { authRouter } from './routes/auth.js';
import { bahanRouter } from './routes/bahan.js';
import { myfavourite } from './routes/favourite.js';
import { historyRouter } from './routes/history.js';
import { pantryRoute } from './routes/pantry.js';
import { recipeRouter } from './routes/recipe.js';
import express from 'express';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/user', authRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/bahan', bahanRouter);
app.use('/api/myfavourite', myfavourite);
app.use('/api/history', historyRouter);
app.use('/api/pantry', pantryRoute);



// listen to server
const port =  process.env.PORT || 3000;

app.listen(port, async () => {
    // console.log(`server is running on `);  // ganti pada sat masuk ke dev-project
    console.log(`server is running on http://localhost:${port}`);
  });