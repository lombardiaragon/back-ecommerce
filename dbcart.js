const fs=require('fs')

class CartsDB{
    constructor(archivo){
        this.archivo=archivo
    }

    async saveCart(newCart){
        try{
            const data=await fs.promises.readFile('data/carts.json','utf-8')
        
            const carritos=JSON.parse(data)
            const id= carritos.length+1
            const timesTamp=new Date().toLocaleString()
            newCart={
                id,
                timesTamp
            }
            carritos.push(newCart)
            await fs.promises.writeFile('data/carts.json',JSON.stringify(carritos))

            return `se ha creado un nuevo carrito cuyo id es ${id}`
        } catch (error){
            return 'error al cargar el carrito'
        }
   }
   async saveProd(id,newProd){
    try{
        const data=await fs.promises.readFile('data/carts.json')
        const carritos=JSON.parse(data)
        const carrito=carritos[id-1]
 
        if(carrito){
            if(carrito.productos==undefined){
                carrito.productos=[]
            }
            const {productos}=carrito
            newProd.id=productos.length+1
            newProd.timesTamp=new Date().toLocaleString()
            productos.push(newProd)
            await fs.promises.writeFile('data/carts.json',JSON.stringify(carritos))
            return `el producto ${newProd.nombre} fue agregado al carrito ${id}`
        }
        else{
            return `no se encontró el carrito indicado`
        }
    }
    catch(error){
        return 'error al cargar el producto'
    }
   }
 
   async getById(id){
        try{
            const data=await fs.promises.readFile('data/carts.json','utf-8')
            const carritos=JSON.parse(data)
            const posCarrito=carritos.findIndex(el=>el.id==id)

            if(carritos[posCarrito]){
            return carritos[posCarrito]
            }
            else{
                return 'carrito no encontrado'
            }
        } catch(error){
            return 'error de lectura'
        }
    }

    async deleteById(id){
        try{
            const data=await fs.promises.readFile('data/carts.json','utf-8')
            const carritos=JSON.parse(data)
            const posCarrito=carritos.findIndex(el=>el.id==id)
           
            if(carritos[posCarrito]){
                carritos.splice(posCarrito,1)
                await fs.promises.writeFile('data/carts.json',JSON.stringify(carritos))
    
                return `el carrito fue borrado exitosamente`
            }
            else{
                return 'no se encontró el carrito indicado'
            }
        } catch(error){
            return 'error de lectura'
        } 
    }
    async deleteProdInCart(id,id_prod){
        try{
            const data=await fs.promises.readFile('data/carts.json','utf-8')
            const carritos=JSON.parse(data)
            const posCarrito=carritos.findIndex(el=>el.id==id)
            const carrito=carritos[posCarrito]
           
            if(carrito && carrito.productos!==undefined){
                const {productos}=carrito
                const posProd=productos.findIndex(el=>el.id==id_prod)

                if(productos[posProd]){
                    productos.splice(posProd,1) 
                    await fs.promises.writeFile('data/carts.json',JSON.stringify(carritos))
                    return `el producto ${id_prod} fue borrado exitosamente del carrito ${id}`
                }
                else{
                    return `el producto ${id_prod} no existe en el carrito ${id}`
                }
            }
            else{
                return 'no se encontraron los datos indicados'
            }
        } catch(error){
            return 'error de lectura'
        }

    }
}

module.exports = CartsDB;
