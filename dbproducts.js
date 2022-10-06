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
            newProd.timesTamp= new Date().toLocaleString()
            productos.push(newProd)
            await fs.promises.writeFile('data/products.json',JSON.stringify(productos))

            return `el producto ${newProd.nombre} fue cargado con éxito`
        } catch (error){
            return `error al cargar el producto ${newProd.nombre}` 
        }
   }
   
   async getAll(){
        try{
            const data=await fs.promises.readFile('data/products.json','utf-8')
            const productos= JSON.parse(data)
            return productos
        } catch(error){
            return 'error de lectura';
        }
    }   
   async getById(id){
        try{
            const data=await fs.promises.readFile('data/products.json','utf-8')
            const productos=JSON.parse(data)
            const producto=productos[id-1]

                if(producto){
                return producto
                }
                else{
                    return 'producto no encontrado'
                }
        } catch(error){
            return 'error de lectura'
        }
    }
    async updateById(id,newProd){
        try{
            const data= await fs.promises.readFile('data/products.json','utf-8')
            const productos=JSON.parse(data)

            if(productos[id-1]){
                newProd.id=id
                productos[id-1]=newProd

                await fs.promises.writeFile('data/products.json',JSON.stringify(productos))
                return 'producto modificado exitosamente'
            }
            else{
                return 'no se encontró el id de producto'
            }
        }catch(error){
            return 'error de lectura'
        }
    }

    async deleteById(id){
        try{
            const data=await fs.promises.readFile('data/products.json','utf-8')
            const productos=JSON.parse(data)
            
            if(productos[id-1]){
                productos.splice(id-1,1)
                await fs.promises.writeFile('data/products.json',JSON.stringify(productos))
    
                return `el producto fue borrado exitosamente`
            }
            else{
                return 'no se encontró el producto indicado'
            }
        } catch(error){
            return 'error de lectura'
        } 
    }

}

module.exports = ProductsDB;
