const express = require("express");
const { initialDatabase } = require("./db/db.conect");
const cors = require("cors");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const Game = require("./models/games.models");
const Jacket = require("./models/jacket.models");
const Phone = require("./models/phone.models");
const Book = require("./models/books.models");
const User = require("./models/user.model");
const Order = require("./models/order.model");

const { error } = require("console");

initialDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

// Functions to fetch data

async function fetchGamesById(id) {
  try {
    const data = await Game.findById(id);
    return data;
  } catch (eror) {
    throw error;
  }
}

async function fetchPhoneById(id) {
  try {
    const data = await Phone.findById(id);
    return data;
  } catch (eror) {
    throw error;
  }
}

async function fetchJacketById(id) {
  try {
    const data = await Jacket.findById(id);
    return data;
  } catch (eror) {
    throw error;
  }
}
async function fetchBookById(id) {
  try {
    const data = await Book.findById(id);
    return data;
  } catch (eror) {
    throw error;
  }
}

async function getOrderHistory(id) {
  try {
    const data = await Order.findById(id).populate("item.itemId");
    return data;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const data = await User.findById(id).populate("orderHistory");
    return data;
  } catch (err) {
    return err;
  }
}

async function getUser(email) {
  try {
    const data = await User.find({ email: email }).populate("orderHistory");
    return data;
  } catch (err) {
    return err;
  }
}

// Api to fetch products

app.get("/products", async (req, res) => {
  const games = await Game.find();
  const jackets = await Jacket.find();
  const books = await Phone.find();
  const phones = await Book.find();

  const products = [...games, ...jackets, ...books, ...phones];
  res.status(200).json({ message: "Success", data: products });
});

app.get("/games/:id", async (req, res) => {
  try {
    const data = await fetchGamesById(req.params.id);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not Found" });
  }
});

app.get("/game", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json({ message: "Success", data: games });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
});

app.get("/phone/:id", async (req, res) => {
  try {
    const data = await fetchPhoneById(req.params.id);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not Found" });
  }
});

app.get("/phone", async (req, res) => {
  try {
    const games = await Phone.find();
    res.status(200).json({ message: "Success", data: games });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
});

app.get("/jacket/:id", async (req, res) => {
  try {
    const data = await fetchJacketById(req.params.id);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not Found" });
  }
});
app.get("/jacket", async (req, res) => {
  try {
    const games = await Jacket.find();
    res.status(200).json({ message: "Success", data: games });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const data = await fetchBookById(req.params.id);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not Found" });
  }
});
app.get("/book", async (req, res) => {
  try {
    const games = await Book.find();
    res.status(200).json({ message: "Success", data: games });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
});

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

app.get("/orderHistory/:id", async (req, res) => {
  try {
    const data = await getOrderHistory(req.params.id);
    if (data) {
      res.status(200).json({ message: "Success", data: data });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

app.post("/order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    if (newOrder) {
      const user = await User.findById(newOrder.userId);
      user.orderHistory.push(newOrder._id);
      await user.save();
      res.status(201).json({ message: "Order Created", newOrder });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (user) {
      if (user[0].password == password) {
        res.status(200).json({ message: "Login Success", user });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

app.post("/user", async (req, res) => {
  // console.log("attempt")
  try {
    const newUser = new User(req.body);
    await newUser.save();
    if (newUser) {
      res.status(201).json({ message: "User Created", newUser });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

app.put("/user/:id", async (req, res) => {
  // console.log("attempt")
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.address.push(req.body);
      await user.save();
      // console.log(user);
      res.status(200).json({ message: "Address Added", user });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error", err });
  }
});

app.get("/userId/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.status(200).json({ message: "Success", user });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error", err });
  }
});

app.put("/deleteAddress/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { address: { _id: req.body.addId } } }, // remove address with matching _id
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({message:"Address Deleted" ,user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error", details: err.message });
  }
});

app.post('/user/:id/wishlist',async(req,res) =>{
  try{
    const user = await getUserById(req.params.id)
    if(user)
    {
      user.wishlist.push(req.body)
      await user.save()
      res.status(200).json({message:"items added to wishlist",user})
    }
    else{
      res.status(404).json({err:"User not found"})
    }
  }catch(err)
  {
    res.status(500).json({err:"Server Error",err})
  }
})
app.post('/user/:id/cart',async(req,res) =>{
  try{
    const user = await getUserById(req.params.id)
    if(user)
    {
      user.cart.push(req.body)
      await user.save()
      res.status(200).json({message:"items added to cart",user})
    }
    else{
      res.status(404).json({err:"User not found"})
    }
  }catch(err)
  {
    res.status(500).json({err:"Server Error",err})
  }
})

app.put('/user/:id/cart',async(req,res)=>{
  try{
    const user = await getUserById(req.params.id)
    if(user)
    {
      if(type="delete")
      {
         user.cart.filter((product) => product._id.toString() != req.body.product._id )
        await user.save()  

        res.status(200).sjon({message:"update successfull",user})
      }
    }
  }catch(err)
  {
    res.status(500).json({err:"server error",err})
  }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
