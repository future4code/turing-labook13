import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import { CreateUser } from "./endpoints/CreateUser";
import { Login } from "./endpoints/Login"


dotenv.config();

const app = express();
app.use(express.json());

// ENPOINT QUE CRIA O USUÁRIO
app.post('/CreateUser', CreateUser);

// ENPOINT DE LOGIN
app.post('/Login', Login);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
