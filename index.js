const express = require("express");
const { initialDatabase } = require("./db/db.conect");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const User = require("./models/user.model");
const Order = require("./models/order.model");
const Product = require("./models/product.model");
const Address = require("./models/address.model");

initialDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

// MiddleWare for authorization

const authMiddlewre = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `))
    return res.status(401).json({ message: "No token provided" });
  // console.log(authHeader.split(' '))
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// Functions to fetch data

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
    const data = await User.findById(id)
      .populate({
        path: "cart.proID",
        select: "title name price",
      })
      .populate({ path: "wishlist.proID", select: "name price title" })
      .populate({
        path: "orderHistory",
        populate: [
          {
            path: "items.itemId",
            model: "Product",
            select: "name title price",
          },
          {
            path: "address",
            model: "Address",
          },
        ],
      })
      .populate({
        path: "address",
        model: "Address",
      });
    return data;
  } catch (err) {
    return err;
  }
}

async function getUser(email) {
  try {
    const data = await User.findOne({ email: email })
      .populate({
        path: "cart.proID",
        select: "title name price",
      })
      .populate({ path: "wishlist.proID", select: "name price title" })
      .populate({
        path: "orderHistory",
        populate: [
          {
            path: "items.itemId",
            model: "Product",
            select: "name title price",
          },
          {
            path: "address",
            model: "Address",
          },
        ],
      })
      .populate({
        path: "address",
        model: "Address",
      });
    return data;
  } catch (err) {
    console.error("Error in getUser:", err);
    throw err;
  }
}

// Protected Routes

app.get("/dashboard", authMiddlewre, (req, res) => {
  res.json({ message: `hello User ${req.user.name}` });
});

// Normal Routes

// app.get("/orderHistory/:id", async (req, res) => {
//   try {
//     const data = await getOrderHistory(req.params.id);
//     if (data) {
//       res.status(200).json({ message: "Success", data: data });
//     } else {
//       res.status(404).json({ error: "Not Found" });
//     }
//   } catch (err) {
//     res.status(500).json({ err: "Server Error" });
//   }
// });

app.post("/order", async (req, res) => {
  // console.log(req.body)
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    if (newOrder) {
      const user = await getUserById(newOrder.userId);
      user.cart = [];
      user.orderHistory.push(newOrder._id);
      await user.save();
      const updatedUser = await getUserById(newOrder.userId);
      res.status(201).json({ message: "Order Created", user: updatedUser });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          "secretKey",
          { expiresIn: "1hr" }
        );
        res.status(200).json({ message: "Login Success", token, user });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Server Error", err });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name,email,password)
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    if (newUser) {
      res.status(201).json({ message: "User Created Successfully. Please wait redirecting to login page", newUser });
    }
  } catch (err) {
    if (err.code == 11000) {
      console.log("Email already exists");
      res.status(400).json({ err: "Email already exists" });
    } else {
      res.status(500).json({ err: "Server Error", err });
    }
  }
});

app.put("/user/:id", async (req, res) => {
  // console.log("attempt")
  try {
    const user = await User.findById(req.params.id);
    const address = new Address(req.body);
    await address.save();
    if (address) {
      user.address.push(address._id);
      await user.save();
      const updatedUser = await getUserById(req.params.id);
      // console.log(user);
      res.status(200).json({ message: "Address Added", user: updatedUser });
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
      // console.log(user)
      res.status(200).json({ message: "Success", user });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error", err });
  }
});

app.put("/deleteAddress/:id", async (req, res) => {
  // console.log(req.body);
  try {
    const address = await Address.findOneAndDelete(req.body.addId);
    if (address) {
      const user = await getUserById(req.params.id);
      user.address.filter((add) => add != req.body.addId);
      const updatedUser = await getUserById(req.params.id);
      res.status(200).json({ message: "Address Deleted", user: updatedUser });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error", details: err.message });
  }
});

app.post("/user/:id/wishlist", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    // Use findIndex to check for existing item
    const itemIndex = user.wishlist.findIndex(
      (item) => item.proID._id.toString() === req.body.proID
    );

    if (itemIndex !== -1) {
      // Item exists: update quantity
      user.wishlist[itemIndex].quantity += req.body.quantity;
    } else {
      // Item doesn't exist: add new
      user.wishlist.push(req.body);
    }

    await user.save();
    const updatedUser = await getUserById(req.params.id);

    res.status(200).json({
      message: "Wishlist updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ err: "Server Error", error: err.message });
  }
});

app.post("/user/:id/cart", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      const indexS = user.cart.findIndex(
        (item) => item.proID._id.toString() == req.body.proID
      );
      if (indexS != -1) {
        user.cart[indexS].quantity += req.body.quantity;
      } else {
        user.cart.push(req.body);
      }
      await user.save();
      const updatedUser = await getUserById(req.params.id);
      res
        .status(200)
        .json({ message: "Items added to wishlist", user: updatedUser });
    } else {
      res.status(404).json({ err: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error", err });
  }
});

app.put("/:id/cart", async (req, res) => {
  // console.log("attempt");
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      const indexS = user.cart.findIndex(
        (item) => item.proID._id.toString() == req.body.proID
      );
      if (indexS !== -1) {
        user.cart.splice(indexS, 1); // remove the item at that index
        await user.save(); // save the updated user
        const updatedUser = await getUserById(req.params.id);
        res.status(200).json({
          message: "Item removed from cart successfully",
          user: updatedUser,
        });
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
});

app.put("/:id/wishlist", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (user) {
      const indexS = user.wishlist.findIndex(
        (item) => item.proID._id.toString() == req.body.proID
      );
      if (indexS !== -1) {
        user.wishlist.splice(indexS, 1); // remove the item at that index
        await user.save(); // save the updated user
        const updatedUser = await getUserById(req.params.id);
        res.status(200).json({
          message: "Item removed from cart successfully",
          user: updatedUser,
        });
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
});

app.get("/products/:name", async (req, res) => {
  try {
    const data = await Product.find({ type: req.params.name });
    if (data) {
      res.status(200).json({ message: "success", data });
    } else {
      res.status(404).json({ message: "No Products Found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error", details: err.message });
  }
});

app.put("/:id/cartFWish", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      const indexS = await user.cart.findIndex(
        (item) => item.proID._id.toString() == req.body.proID._id
      );
      const indexW = await user.wishlist.findIndex(
        (item) => item.proID._id.toString() == req.body.proID._id
      );

      if (indexS != -1) {
        user.cart[indexS].quantity += req.body.quantity;
      } else {
        user.cart.push(req.body);
      }
      user.wishlist.splice(indexW, 1);
      await user.save();
      const updatedUser = await getUserById(req.params.id);
      res
        .status(201)
        .json({ message: "wishlist and cart updated", user: updatedUser });
    } else {
      console.log("user not found");
      res.status(404), json({ message: "User not Found" });
    }
  } catch (err) {
    // console.log(err);
    res.json({ err: "Server Error", err });
  }
});

// app.post('/product',async (req,res) =>{
//   try{
//     const newProduct = new Product(req.body)
//     await newProduct.save()
//     if(newProduct)
//     {
//       res.status(201).json({message:"Product created",newProduct})
//     }
//   }catch(err)
//   {
//     console.log(err)
//   }
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
