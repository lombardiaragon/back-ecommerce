const express=require('express')
const fs=require('fs')
const db = require("dbproducts.js");

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

    const ResProd= await DB.getById(id)
    res.send({Respuesta: ResProd})
})

// ● POST '/api/productos' -> incorporar producto al listado(administrador)
routerProds.post('/',Private, async(req,res)=>{
    const newProd= req.body
    const msg= await DB.save(newProd)
    res.send({message: msg})

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
routerProds.delete('/:id', async(req,res)=>{
    const{id}=req.params
    const msg=await DB.deleteById(id)
    res.send({message: msg})
})


module.exports=routerProds