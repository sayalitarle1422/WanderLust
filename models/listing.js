// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;

// const listingSchema = new Schema({
//     title:{
//         type:String,
//         required: true,
//     },
//     description:String,
    
//     image:{
//         type:String,
//         default:
//             "https://images.unsplash.com/photo-1724089807973-e073f26bb204?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
//         set: (v)=>
//              v === ""? "https://images.unsplash.com/photo-1724089807973-e073f26bb204?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D"
//         :v,
//         // default:
//         //     "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         //   set: (v) =>
//         //     v === ""
//         //       ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//     //     //       : v,
//     },
    
//     price:Number,
//     location:String,
//     country:String,
// });

// const Listing=mongoose.model("Listing",listingSchema);
// module.exports=Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
  image: {
    filename: {
      type: String,
      default: "default.jpg", // Optional fallback
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1724089807973-e073f26bb204?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1724089807973-e073f26bb204?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D"
          : v,
    },
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: false,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
