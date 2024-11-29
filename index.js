import express from "express";
const app = express()
import cors from "cors"
import {MongoClient, ObjectId } from "mongodb";
// const uri = "mongodb://127.0.0.1:27017"
const uri = "mongodb+srv://yashwanthgummalla1805:Vks2hGSVGX8uGAbZ@cluster0.jo9lq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = client.db("ecomm")

app.use(express.json());
app.use(cors());

app.listen(8080,()=>{
    console.log("server atrted on port 8080")
})

app.get("/",async(req,res) =>{
    const items = await db.collection("products").find().toArray()
     res.status (200).json (items);

});

// app.get("/name",(req,res) =>{
//    res.send("Yashwanth Gummalla")
// })

// app.get("/products",(req,res)=>{
//    let products=[{
//        "name":"Product 1",
//        "price":34
//     }
//     ]
//     let products=get list from mongodb
//     res.json(products)
// })
// app.get("/name",(req,res)=>{
//    res.send("Harshita Peduru")
// })
// app.get("/customers",(req,res)=>{
//    let customers=[{
//        "name":"abcd",
//        "email":"abcd@gmail.com",
//         "city":"Hyderabad"
//     }]
//     res.json(customers)
    
// })

app.post("/", async (req, res) => {
    const { name, desc, price, url} = req.body;
    const data = {
      name: name,
      desc:desc,
      price: price,
      url:url,
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });