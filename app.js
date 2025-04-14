require("dotenv").config(); // at the top of your main app file (app.js)


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require('./models/listing.js');
const path=require("path");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");
const listing = require('./models/listing.js');
const mongo_url="mongodb://127.0.0.1:27017/wonderlust";
console.log(__dirname);

main().then(()=>{
    console.log("Connecting");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/",(req,res)=>{
    res.send("Hii ,i'm root");
})

//index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//New route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route
app.post("/listings",async (req,res)=>{
    // let {title,description,image,price,country,location}=req.body;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing });
});

//Update Route
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
// app.get("/testlisting",async (req,res)=>{
//     let smaplelisting=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Goa",
//         country:"India",

//     });
//     await smaplelisting.save();
//     console.log("Sample was Saved");
//     res.send("successful testing");
// })
app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});