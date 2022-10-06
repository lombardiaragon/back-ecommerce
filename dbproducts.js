const fs=require('fs')

class ProductsDB{
    constructor(archivo){
        this.archivo=archivo
    }

    async save(newProd){
        try{
            const data=await fs.promises.readFile('data/products.json','utf-8')
        
            const productos=JSON.parse(data)
            newProd.id= productos.length+1
            productos.push(newProd)
            await fs.promises.writeFile('data/products.json',JSON.stringify(productos))

            return `el producto ${newProd} fue cargado con éxito`
        } catch (error){
            'error al cargar el producto'
        }
   }
   
   async getAll(){
        try{
            const data=await fs.promises.readFile('data/productos.json','utf-8')
            return JSON.parse(data);
        } catch(error){
            return[];
        }
    }   
   async getById(id){
        try{
            const data=await fs.promises.readFile('data/productos.json','utf-8')
            const productos=JSON.parse(data)
            let producto=productos.find(el=>el.id===id)
                if(producto!==undefined){
                return producto
                }
                else{
                    return 'producto no encontrado'
                }
        } catch(error){
            return 'error de lectura'
        }
    }

    async deleteById(id){
        try{
            const data=await fs.promises.readFile('data/products.json','utf-8')
            const productos=JSON.parse(data)
            let producto=productos.findIndex(el=>el.id===id)
           
            if(producto!==-1){
                let index= productos.indexOf(producto)
                productos.splice(index,1)
                await fs.promises.writeFile('data/products.json',JSON.stringify(productos))
    
                return `el producto ${producto} fue borrado exitosamente`
            }
            else{
                return 'no se encontró el producto indicado'
            }
        } catch(error){
            return 'error de lectura'
        } 
    }

    // async deleteAll(){
    //     const data=await fs.promises.readFile('data/products.json','utf-8')
    //     const productos=JSON.parse(data)
    //     productos.splice(0,productos.length)
    //     console.log(productos)

    //     await fs.promises.writeFile('data/products.json',JSON.stringify(productos))

    // }
}

module.exports = ProductsDB;
