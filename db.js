const fs=require('fs')

class DataBase{
    constructor(archivo){
        this.archivo=archivo
    }

    async save(object){
        const data=await fs.promises.readFile('data/products.json','utf-8')
    
        const productos=JSON.parse(data)
        const id= productos.length+1
        object.id=id
        productos.push(object)
        console.log(productos)
        await fs.promises.writeFile('data/products.json',JSON.stringify(productos))
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
    const data=await fs.promises.readFile('data/productos.json','utf-8')
    const productos=JSON.parse(data)
    let producto=productos.find(el=>el.id===id)
        if(producto){
            console.log(producto)
        }
        else{
            console.log('el usuario no existe')
        }
    }

    async deleteById(id){
        const data=await fs.promises.readFile('data/products.json','utf-8')
        const productos=JSON.parse(data)
        let producto=productos.find(el=>el.id===id)
       
        if(producto){
            let index= productos.indexOf(producto)
            productos.splice(index,1)
            console.log(productos)
        }
        else{
            console.log('el usuario no existe')
        }
        await fs.promises.writeFile('data/products.json',JSON.stringify(productos))

    }

    async deleteAll(){
        const data=await fs.promises.readFile('data/products.json','utf-8')
        const productos=JSON.parse(data)
        productos.splice(0,productos.length)
        console.log(productos)

        await fs.promises.writeFile('data/products.json',JSON.stringify(productos))

    }
}

module.exports = DataBase;
