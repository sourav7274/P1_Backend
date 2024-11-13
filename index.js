const express = require('express');
const { initialDatabase } = require('./db/db.conect');
const cors = require('cors');
const app = express();
app.use(express.json())
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const Game = require('./models/games.models');
const Jacket = require('./models/jacket.models');
const Phone = require('./models/phone.models');
const Book = require('./models/books.models');
const { error } = require('console');

initialDatabase();

app.get('/', (req, res) => {
    res.json({ message: "Welcome to API" });
});


// Functions to fetch data

async function fetchGamesById(id) {
    try{
        const data = await Game.findById(id)
        return data
    }catch(eror)
    {
        throw error
    }
}

async function fetchPhoneById(id) {
    try{
        const data = await Phone.findById(id)
        return data
    }catch(eror)
    {
        throw error
    }
}

async function fetchJacketById(id) {
    try{
        const data = await Jacket.findById(id)
        return data
    }catch(eror)
    {
        throw error
    }
}
async function fetchBookById(id) {
    try{
        const data = await Book.findById(id)
        return data
    }catch(eror)
    {
        throw error
    }
}

// Api to fetch products


app.get('/products',async (req,res) =>{
    const games = await Game.find()
    const jackets = await Jacket.find()
    const books = await Phone.find()
    const phones = await Book.find()

    const products = [...games,...jackets,...books,...phones]
    res.status(200).json({message:"Success",data:products})
})

app.get('/games/:id',async (req,res) =>{
    try{
        const data = await fetchGamesById(req.params.id)
        res.status(200).json({message:"Success",data:data})
    } catch(error)
    {
        console.log(error)
        res.status(404).json({error:"Not Found"})
    }
})

app.get('/games',async (req,res) =>{
    try{
        const games = await Game.find()
        res.status(200).json({message:"Success",data: games})
    }
    catch(error)
    {
        res.status(404).json({error:"Not Found"})
    }
})


app.get('/phone/:id',async (req,res) =>{
    try{
        const data = await fetchPhoneById(req.params.id)
        res.status(200).json({message:"Success",data:data})
    } catch(error)
    {
        console.log(error)
        res.status(404).json({error:"Not Found"})
    }
})

app.get('/phone',async (req,res) =>{
    try{
        const games = await Game.find()
        res.status(200).json({message:"Success",data: games})
    }
    catch(error)
    {
        res.status(404).json({error:"Not Found"})
    }
})


app.get('/jacket/:id',async (req,res) =>{
    try{
        const data = await fetchJacketById(req.params.id)
        res.status(200).json({message:"Success",data:data})
    } catch(error)
    {
        console.log(error)
        res.status(404).json({error:"Not Found"})
    }
})
app.get('/jacket',async (req,res) =>{
    try{
        const games = await Game.find()
        res.status(200).json({message:"Success",data: games})
    }
    catch(error)
    {
        res.status(404).json({error:"Not Found"})
    }
})


app.get('/book/:id',async (req,res) =>{
    try{
        const data = await fetchBookById(req.params.id)
        res.status(200).json({message:"Success",data:data})
    } catch(error)
    {
        console.log(error)
        res.status(404).json({error:"Not Found"})
    }
})
app.get('/book',async (req,res) =>{
    try{
        const games = await Game.find()
        res.status(200).json({message:"Success",data: games})
    }
    catch(error)
    {
        res.status(404).json({error:"Not Found"})
    }
})



//funciton to push data
// async function createData(data) {
//     try{
//         const newData = new Game(data)
//         const saveData = await newData.save()
//         return saveData
//     } catch(error)
//     {
//         throw error
//     }
// }

// async function createPhone(data){
//     try{
//         const newdata = new Phone(data)
//         const saveData = await newdata.save()
//         return saveData
//     } catch(error)
//     {
//         console.log(error)
//     }
// }

// async function createJacket(data){
//     try
//     {   
//         const newdata = new Jacket(data)
//         const saveData = await newdata.save()
//         return saveData
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// }

// async function createBook(data)
// {
//     try{
//         const newdata = new Book(data)
//         const saveData = await newdata.save()
//         return saveData
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// }

// Apis to save data


// app.post('/games',async (req,res) =>{
//    try{
//         const saveData = await createData(req.body)
//         res.status(201).json({message:"Saved",data:saveData})
//         console.log(saveData)
//    } catch(error)
//    {
//         res.status(500).json({error:"Unable to send Data"})
//    }
// })

// app.post('/books',async(req,res) =>{
//     try{
//         const saveData = await createBook(req.body)
//         res.status(201).json({message:"Saved",data:saveData})
//     }
//     catch{
//         res.status(500).json({error:"Unable to save"})
//     }
// })
// app.post('/jackets',async(req,res) =>{
//     try{
//         const saveData = await createJacket(req.body)
//         res.status(201).json({message:"Saved",data:saveData})
//     }
//     catch{
//         res.status(500).json({error:"Unable to save"})
//     }
// })

// app.post('/phone',async(req,res) =>{
//     try{
//         const saveData = await createPhone(req.body)
//         res.status(201).json({message:"Saved",data:saveData})
//     }
//     catch{
//         res.status(500).json({error:"Unable to save"})
//     }
// })



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
