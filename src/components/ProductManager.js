import { promises as fs } from "fs";

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async(title, description, price, thumbnail, code, stock) => {

        ProductManager.id++
        
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        respuesta3.find(product => product.id === id)
        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else {
            console.log(filter)
        }
    }

    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto eliminado");
    }

    updateProducts = async ({id, ...producto}) =>{
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
    

        let productsModify = [{ ...producto, id}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModify));
    }

}

const productos = new ProductManager

//AGREGAMOS PRODUCTOS

/*productos.addProduct("pelota", "pelota de futbol", 20000, "no image", 1, 20);
productos.addProduct("pelota volley", "pelota de volley", 15000, "no image", 21, 15);
productos.addProduct("pelota basquet", "pelota de basquet", 19000, "no image", 22, 12);
productos.addProduct("pelota2", "pelota de futbol2", 20000, "no image", 12, 25);
productos.addProduct("pelota volley2", "pelota de volley2", 15000, "no image", 212, 10);
productos.addProduct("pelota basquet2", "pelota de basquet2", 19000, "no image", 222, 18);
productos.addProduct("pelota3", "pelota de futbol3", 20000, "no image", 13, 9);
productos.addProduct("pelota volley3", "pelota de volley3", 15000, "no image", 213, 3);
productos.addProduct("pelota basquet3", "pelota de basquet3", 19000, "no image", 223, 7);
productos.addProduct("pelota4", "pelota de futbol4", 20000, "no image", 14, 8);*/


productos.getProducts()

//BUSCA PRODUCTOS POR ID
//productos.getProductsById(2)


//BORRAMOS PRODUCTOS POR ID
//productos.deleteProductsById(2)


// ACTUALIZA PRODUCTOS CON MISMO ID
/* productos.updateProducts({
    title: 'pelota',
    description: 'pelota de futbol',
    price: 40000,
    thumbnail: 'no image',
    code: 1,
    stock: 20,
    id: 1
}) */