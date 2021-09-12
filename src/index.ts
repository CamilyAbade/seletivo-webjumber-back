import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { productRouter } from "./routes/productRouter";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/product", productRouter)



const PORT = process.env.PORT || 2308;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

