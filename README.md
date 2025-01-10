# Ena_ema Server with MongoDB

# Ena_ema Server with MongoDB

## you can use the database with [this URL](https://ena-ema-server-theta.vercel.app/) free! just using the url
URL: https://ena-ema-server-theta.vercel.app/

## Setup

To set up the Ena_ema Server project with MongoDB, follow these steps:

```bash
npm install
npm init -y
npx tsc --init
```

and you have to add some credentials on .env file,


```bash
NODE_ENV="development"
PORT="5000"
DATABASE_URL="YOUR_DATABASE_URL"       Important!
JWT_SECRET="YOUR JWT_SCRETE"
EXPIRES_IN="15d"
REFRESH_TOKEN_SECRET="YOUR_REFRESH_TOKEN_SECRETE"
REFRESH_TOKEN_EXPIRES_IN="30d"
RESET_PASS_TOKEN="f9ea852d7c2706d762f54c51daedc7088c8cb625180a5a5b5011501f69da3cf9a00ce31f47a4dc2e18e029e15676e56a3cdd681b7c3b2a3c91a928bd20e0e1b4"
BCRYPT_SALT_ROUNDS="10"
```

## Run the project on you machine use the command

```bash
npm run server
```

Powered  by Mehedi hasan

