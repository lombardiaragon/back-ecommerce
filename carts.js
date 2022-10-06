const express=require('express')
const db = require("dbcarts.js");

const {Router}=express
const DB = new db("data");

const routerCart=Router()
const Carrito=[]


// ● POST '/' -> crea un carrito y lo devuelve con su id 
// asignado.
routerCart.post('/', async(req,res)=>{
    const newCart= req.body

    const msg=await DB.saveCart(newCart)

    res.send({message: msg})
})

// ● DELETE '/:id' -> elimina un carrito según su id.
routerCart.delete('/:id', async(req,res)=>{
    const{id}=req.params

    const msg=await DB.deleteById(id)
    res.send({message: msg})

})

// ● GET '/:id/productos' -> devuelve todos los productos guardados en el carrito.
routerCart.get('/:id/productos', async(req,res)=>{
    const{id}=req.params
    const prodsInCart= await DB.getById(id)
    res.send({prodsInCart})
})

// ● POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
routerCart.post('/:id/productos', async(req,res)=>{
    const newProd= req.body
    const{id}=req.params

    const msg=await DB.saveProd(id,newProd)
    res.send({message: msg})
})

// ● DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.
routerCart.delete('/:id/productos/:id_prod', async(req,res)=>{
    const{id,id_prod}=req.params

    const msg=await DB.deleteProdInCart(id,id_prod)
    res.send({message:msg})
})


module.exports=routerCart