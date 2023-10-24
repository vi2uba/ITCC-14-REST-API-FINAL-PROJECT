const express = require('express');
const router = express.Router();

//Handles GET requests

router.get('/', (req,res,next) =>{
    res.status(200).json({
        message: 'Hell Yeah!, Handling GET request to /barangay'
    });

});

//Handles POST requests
router.post('/', (req,res,next) =>{
    res.status(200).json({
        message: 'Hell Yeah!, Handling POST request to /barangay'
    });

});

//Handles PUT requests
router.put('/:barangayID', (req,res,next) =>{
   const barangayID = req.params.barangayID;
   if (barangayID ==='special'){
    res.status(200).json({
        message: 'HANDLING SPECIAL PUT request to /barangay',
        barangayID: barangayID
    });

   }
   else{
    res.status(200).json({
        message: 'HANDLING NORMAL PUT request to /barangay, RIP BOZO',
    });

   }

});

//Handles DELETE requests

router.delete('/:barangayID', (req,res,next) =>{
    const barangayID = req.params.barangayID;

    res.status(200).json({
        message: 'DELETEING BARANGAY ENTRY'
    });

});


module.exports = router;