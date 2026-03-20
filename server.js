import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index.js"
import { ConnectDb } from "./config/db.js";

//
dotenv.config();

await ConnectDb();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/',routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


process.on('uncaughtException',(error)=>{
    console.error('uncaught exception:',error);
    process.exit(1);
})

process.on('unhandledRejection',(error)=>{
    console.error("uncaught promises:",error)
    process.exit(1);
})