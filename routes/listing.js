const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//INDEX ROUTE  //CREATE ROUTE
router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,
 
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing));

  
  
  //NEW ROUTE  
router.get("/new", isLoggedIn,listingController.renderNewForm);
  
  
  //SHOW ROUTE  //UPDATE ROUTE   //DELETE ROUTE
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner ,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner , wrapAsync(listingController.destroyListing));
  
 

    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(res.error){
    //   throw new ExpressError(400, result.error);
    // }
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing");
    // }
    // let {title,description, image, price, location , country}=req.body;
    
     
  
      // if(!newListing.title){
      //   throw new ExpressError(400,"Title is missing");
      // }
      // if(!newListing.description){
      //   throw new ExpressError(400,"Description is missing");
      // }
      // if(!newListing.location){
      //   throw new ExpressError(400,"Location is missing");
      // }
     
  
  //EDIT ROUTE
router.get("/:id/edit" , isLoggedIn,isOwner , wrapAsync(listingController.renderEditForm));
  
  


   
module.exports = router;