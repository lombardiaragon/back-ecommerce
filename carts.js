const express=require('express')
const db = require("db.js");

const {Router}=express
const DB = new db("data");

const routerCart=Router()
const Carrito=[]


// ● POST '/' -> crea un carrito y lo devuelve con su id 
// asignado.
routerCart.post('/', (req,res)=>{
    const newCart= req.body
    newCart.id=Carrito.length +1
    newCart.timesTamp=new Date.now()
    Carrito.push(newCart)
    res.send({nuevoCarrito: newCart})
})

// ● DELETE '/:id' -> elimina un carrito según su id.
routerCart.delete('/:id', (req,res)=>{
    const{id}=req.params
    if (Carrito.indexOf(Carrito[id-1])===-1){
       res.send({ error : 'producto no encontrado' })
    }
    else{
        Carrito.splice(id-1,1)
        res.send({Carrito})
    }
})

// ● GET '/:id/productos' -> devuelve todos los productos guardados en el carrito.
routerCart.get('/:id/productos', (req,res)=>{
    const{id}=req.params
    const prodsInCart=Carrito.findIndex(el=>el.id==id)
    res.send({prodsInCart})
})

// ● POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
routerCart.post('/:id/productos', (req,res)=>{
    const newProd= req.body
    const{id}=req.params
    const cartInCarrito=Carrito.findIndex(el=>el.id==id)
    newProd.id=cartInCarrito.length +1
    cartInCarrito.push(newProd)
    res.send({nuevoProd: newProd})
})

// ● DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.
routerCart.delete('/:id/productos/:id_prod', (req,res)=>{
    const{id}=req.params
    if (Carrito.indexOf(Carrito[id-1])===-1){
       res.send({ error : 'producto no encontrado' })
    }
    else{
        Carrito.splice(id-1,1)
        res.send({Carrito})
    }
})


module.exports=routerCart