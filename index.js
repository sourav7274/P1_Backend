const express = require('express');
const cors = require('cors');
const app = express()

const corsOptions = {
    origin:"*",
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
const Products = require('./models/products.json')

const getProductById = (id) =>{
    const data = Products.filter(pro => pro.id == id)
    return data
}

const getCategory = (id) =>{
    const data = Products.filter(pro => pro.id == id)
    return data
}

app.get('/products',(req,res) => {
    res.json(Products)
})
app.get('/product/:id',(req,res) =>{
    const data = getProductById(req.params.id)
    res.json(data)
})

app.get('/category/:id',(req,res) =>{
    const data = getCategory(req.params.id)
    res.json(data)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
