# DISHCOVER-API
These are APIs to LOGIN, LOGOUT, REGISTER, get Recipe, get queryRecipe, get detailRecipe, get History, delete History, get MyFavourite, post Favourite, delete Favourite, and also POST ingredientPredict

# API Endpoint

### [API Documentation](https://splendid-berry-966.notion.site/DISHCOVER-API-261a08372da04fd699211d64a931e9ef?pvs=4)

# Cara Menjalankan API di local
*Salin perintah ini di terminal kamu atau git bash*

- Clone project from github

```bash
git clone https://github.com/Project-Dishcover/DISHCOVER-API.git 
```
- Change Directory to DISHCOVER-API

```bash
cd DISHCOVER-API
```

-   copy .env from .env.example

```bash

cp .env.example .env

```

- Change the database name in the .env file

```bash
DB_DATABASE_DEV=mysql://root:@localhost:(your port)/yourdb
```

- Install All Dependencies

```bash
npm install
```

- Migrate Database

```bash
npx prisma migrate dev --name init 
```

- Run the server

```bash
npm run dev
```
