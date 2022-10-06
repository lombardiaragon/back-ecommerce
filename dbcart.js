const fs=require('fs')

class CartsDB{
    constructor(archivo){
        this.archivo=archivo
    }

    async saveCart(newCart){
        try{
            const data=await fs.promises.readFile('data/carts.json','utf-8')
        
            const carritos=JSON.parse(data)
            newCart.id= carts.length+1
            newCart.timesTamp=new Date.now()
            carritos.push(newCart)
            await fs.promises.writeFile('data/carts.json',JSON.stringify(productos))

            return `se ha creado un nuevo carrito cuyo id es ${newCart.id}`
        } catch (error){
            return 'error al cargar el carrito'
        }
   }
   async saveProd(id,newProd){
    try{
        const data=fs.promises.readFile('data/carts.json')
        const carritos=JSON.parse(data)
        const cartInCarrito=carritos.findIndex(el=>el.id===id)
        if(cartInCarrito!==-1){
            newProd.id=cartInCarrito.length +1
            cartInCarrito.push(newProd)
            await fs.promises.writeFile('data/carts.json',JSON.stringify(productos))
            return `el producto ${newProd.name} fue agregado al carrito ${cartInCarrito.id}`
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
            let carrito=carritos.find(el=>el.id===id)
                if(carrito!==undefined){
                return carrito
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
            let carrito=carritos.findIndex(el=>el.id===id)
           
            if(carrito!==-1){
                let index= carritos.indexOf(carrito)
                carritos.splice(index,1)
                await fs.promises.writeFile('data/carts.json',JSON.stringify(productos))
    
                return `el carrito ${carrito.id} fue borrado exitosamente`
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
            let carrito=carritos.findIndex(el=>el.id===id)
           
            if(carrito!==-1){
                const prodToDelete=carrito.findIndex(el=>el.id===id_prod) 
                carrito.splice(prodToDelete,1) 
                return `el carrito ${prodToDelete.id} fue borrado exitosamente`
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
