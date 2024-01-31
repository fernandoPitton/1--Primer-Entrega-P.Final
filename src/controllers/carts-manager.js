const { error } = require("console");


const fs = require("fs").promises;

class CartsManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addCarts() {
        console.log("agregando carrito");
        const arrayCarts = await this.leerArchivo();


        const newCarts = {
            products: []
        }

        if (arrayCarts.length > 0) {
            CartsManager.ultId = arrayCarts.reduce((maxId, carts) => Math.max(maxId, carts.id), 0);
        }

        newCarts.id = ++CartsManager.ultId;

        arrayCarts.push(newCarts);
        await this.guardarArchivo(arrayCarts);
    } catch(error) {
        console.log("Error al agregar el carrito", error);
        throw error;
    }

    async addProduct(cid, pid) {
        try {
            const arrayCarts = await this.leerArchivo();
            const cartsBuscado = arrayCarts.find(item => item.id === cid);
            
            if (!cartsBuscado) {
                console.log("El carrito no existe");
                return;
            }else{
                const productBuscado = cartsBuscado.products.find(item => item.id === pid);
                if (productBuscado) {
                    const indiceObjetoAEditar = cartsBuscado.products.findIndex(objeto => objeto.id === pid);
                    cartsBuscado.products[indiceObjetoAEditar].quantity += 1;
                    await this.actualizarArchivo(cid,cartsBuscado);
                    
                }else{
                    const addProduct = {
                        id : pid,
                        quantity : 1
                    }
                    cartsBuscado.products.push(addProduct);
                    await this.actualizarArchivo(cid,cartsBuscado);
                }
            }
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    
    }

    async getProductsBycId(cid){
        try {
            const arrayCarts = await this.leerArchivo();
            const cartsBuscado = arrayCarts.find(item => item.id === cid);
            cartsBuscado.products.forEach(elemento => {
                
                console.log(elemento.id);

              });
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayCarts = JSON.parse(respuesta);
            return arrayCarts;
        } catch (error) {
            console.log("Error al leer un archivo", error);
            throw error;
        }
    }

    async guardarArchivo(arrayCarts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
            throw error;
        }
    }

    async actualizarArchivo(id, cartActualizado){
        const arrayCarts = await this.leerArchivo();
        const indiceObjetoAEditar = arrayCarts.findIndex(objeto => objeto.id === id);
        arrayCarts[indiceObjetoAEditar]= cartActualizado;
        await this.guardarArchivo(arrayCarts);

    }

}
module.exports = CartsManager;