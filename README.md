# DISHCOVER-API
API for DISHCOVER 
## Cara Menjalankan API di local
*Salin perintah ini di terminal kamu atau git bash*

- Clone project from github

```bash
git clone https://github.com/Project-Dishcover/DISHCOVER-API.git 
```
- Change Directory to DISHCOVER-API

```bash
cd DISHCOVER-API
```

-   There are two env in this code, <br/> one in root => for JWT Token <br/> one inside src/ => for DATABASE <br>
    Copy the .env.example file to .env

```bash
cp .env.example .env

cd src/

cp .env.example .env
```

- Change the database name in the .env file

```bash
DB_DATABASE_DEV=mysql://root:@localhost:(your route)/yourdb
```

- Install All Dependencies

```bash
node install
```

- Migrate Database

```bash
npx prisma migrate dev --name init 
```

- Run the server

```bash
npm run dev
```