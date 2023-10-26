const express = require('express');
const router = express.Router();

//Handles GET requests

router.get('/', (req,res,next) =>{
    res.status(200).json({
        message: 'Hell Yeah!, Handling GET request to /people'
    });

});

//Handles POST requests
router.post('/', (req,res,next) =>{
    const people ={
        name: req.body.name,
        residence: req.body.residence
    }

    res.status(200).json({
        message: 'Hell Yeah!, Handling POST request to /people',
        created_people: people
    });

});

//Handles PUT requests
router.put('/:personID', (req,res,next) =>{
   const personID = req.params.personID;
   if (personID ==='special'){
    res.status(200).json({
        message: 'HANDLING SPECIAL PUT request to /people',
        personID: personID
    });

   }
   else{
    res.status(200).json({
        message: 'HANDLING NORMAL PUT request to /people, RIP BOZO',
    });

   }

});

//Handles DELETE requests

router.delete('/:personID', (req,res,next) =>{
    const personID = req.params.personID;

    res.status(200).json({
        message: 'DELETEING PERSON ENTRY'
    });

});


module.exports = router;