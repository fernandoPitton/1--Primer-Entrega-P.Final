const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

//Middleware
app.use(express.json());
//Para manipular datos JSON
app.use(express.urlencoded({extended:true}));
//Para recibir datos complejos. 


//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);




app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})