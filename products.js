const express=require('express')
const db = require("db.js");

const {Router}=express
const DB = new db("data");

const routerProds=Router()
// const Productos=[]

// Para chequear si se tienen permisos de administrador
let isAdmin=true
const Private=(req,res,next)=>{
    if(isAdmin){
        next()
    }
    else{
        res.status(403).send({error:'Se requiere permiso de administrador'})
    }
}


// ● GET '/api/productos' -> devuelve todos los productos.
routerProds.get('/', async (req,res)=>{
    const Productos= await DB.getAll()
    res.send({Productos})
})

// ● GET '/api/productos/:id' -> devuelve un producto según su id.
routerProds.get('/:id', async(req,res)=>{
    routerProds.use(Private)
    const{id}=req.params
    const Producto=await DB.getById(id)
    if (Productos.indexOf(Productos[id-1])===-1){
        res.send({ error : 'producto no encontrado' })
    }
    else{
        const ProdFind=Productos[id-1]
        res.send({ProdFind})
    }
})

// ● POST '/api/productos' -> incorporar productos al listado(administrador)
routerProds.post('/',Private, (req,res)=>{
    const newProd= req.body
    newProd.id=Productos.length +1
    newProd.timesTamp=new Date.now()
    Productos.push(newProd)
    res.send({nuevo:newProd})
})

// ● PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProds.put('/:id',Private, (req,res)=>{
    const{id}=req.params
    const updateProd=req.body
    if (Productos.indexOf(Productos[id-1])===-1){
        res.send({ error : 'producto no encontrado' })
    }
    else{
        updateProd.id=id
        const prevProd=Productos[id-1]
        Productos[id-1]=updateProd
        res.send({anterior:prevProd, nuevo:updateProd})       
    }
})

// ● DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProds.delete('/:id', (req,res)=>{
    const{id}=req.params
    if (Productos.indexOf(Productos[id-1])===-1){
       res.send({ error : 'producto no encontrado' })
    }
    else{
        Productos.splice(id-1,1)
        res.send({Productos})
    }
})


module.exports=routerProds