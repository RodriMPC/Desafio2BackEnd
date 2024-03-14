import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express()
app.use(express.urlencoded({extented : true}));

const products = new ProductManager();
const readProducts = products.readProducts()

 app.get("/products", async (req, res) => {
   
   let limit= req.query.limit;
   console.log(limit);
    res.send(await readProducts);
 });

 const port = 8080;
 const server = app.listen(port, () => {
    console.log(`Express por Local Host ${server.address().port}`);
 })
 server.on("error", (error) => console.log(`Error del servidor ${error}`))
 