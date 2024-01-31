
const express = require("express");
const router = express.Router(); 

const CartsManager = require("../controllers/carts-manager");
const cartsManager = new CartsManager("./src/models/carts.json");


router.post("/", async (req, res) => {
    
    try {
        await cartsManager.addCarts(),
        res.status(201).json({message: "Carrito agregado exitosamente"});
    } catch (error) {
        console.log("error al agregar un Carrito ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

router.post("/:cid/product/:pid", async (req, res) =>{
    let cid = req.params.cid; 
    
    let pid = req.params.pid; 
    
    try {
        await cartsManager.addProduct(parseInt(cid),parseInt(pid) ),
        res.status(201).json({message: "Producto agregado al carrito exitosamente"});
    } catch (error) {
        console.log("error al agregar un Producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

router.get("/:cid", async (req, res)=>{
    let cid = req.params.cid;
    try {
        await cartsManager.getProductsBycId(parseInt(cid)),
        res.status(201).json({message: "Producto leidos exitosamente"});
    } catch (error) {
        console.log("error al agregar un Producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

module.exports = router; 