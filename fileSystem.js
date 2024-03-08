import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.patch = "./products.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respusta2 = await this.readProducts()
        return console.log(respusta2);
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado");
        } else {
            console.log();
        }

        console.log(respuesta3.find(product => product.id === id));
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto eliminado");
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsModified = [
            {id, ...producto},
            ...productOld 
        ]
        await fs.writeFile(this.patch, JSON.stringify(productsModified))
    }
}

const products = new ProductManager();

//products.addProduct("Titulo1", "Descripcion1", 2000, "Imagen1", "abc123", 10)
//products.addProduct("Titulo2", "Descripcion2", 4000, "Imagen2", "abc124", 20)

//products.getProducts()

//products.deleteProductsById(2)

products.updateProducts({
    title: 'Titulo1',
    description: 'Descripcion1',
    price: 5000,
    img: 'Imagen1',
    code: 'abc123',
    stock: 10,
    id: 1
  })
