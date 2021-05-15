const express = require('express')
const router = express.Router();
const Contact = require('../models/contacts')

//get contacts
router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contacts)=>{
        res.json(contacts);
    })
})

//add contact
router.post('/contact',(req,res,next)=>{
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:'Failed to add contacts'});
        }
        else{
            res.json({msg:'Contact Added Successfully'});
        } 
    });

});

//delete contact
router.delete('/contact/:id',(req,res,next)=>{
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        } 
        else{
            res.json(result);
        }
    })
})

module.exports = router;