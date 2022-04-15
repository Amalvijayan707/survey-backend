const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const empModel = require('../models/emp.model');

router.post('/', async (req, res) => {
    console.log('body', req.body)
    try {

        const employs = new empModel({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            age: req.body.age
        
        })

        await employs.save();
        res.json({
            success:1,
            message:'employee successfully saved'
        })

    } catch (error) {
        res.json({
            success:0,
            message:'something went wrong while saving emp' + error
        })

    }


})



router.get('/', async (req, res) => {
    try {

        let allEmployess = await empModel.find();
        res.json({
            success: 1,
            message:'employee listed successfully',
            items: allEmployess
        })
    } catch (error) {
        res.json({
            success: 0,
            message:'something went wrong while listing employee' + error
            
        })
    }
    
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    let validId = mongoose.Types.ObjectId.isValid(id);
    if(validId) {
        try {

            let singleEmployee = await empModel.findById({_id : id})
            res.json({
                success: 1,
                message:'single employee listed successfully',
                items: singleEmployee
            })
    

        } catch (error) {
            res.json({
                success: 0,
                message:'something went wrong while listing single employee' + error
                
            })  

        }

    } else {
        res.json({
            success: 0,
            message: 'invalid id'
        })
    }

    console.log({id})
});


router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let validId = mongoose.Types.ObjectId.isValid(id);
    if(validId) {
        try {
            await empModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    age: req.body.age
                }
            })
            res.json({
                success: 1,
                message:'employee successfully updated',
                
            })

        } catch (error) {
            res.json({
                success: 0,
                message:'something went wrong while updating employee' + error
                
            })  


        }
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let validId = mongoose.Types.ObjectId.isValid(id);
    if(validId) {
        try {
            await empModel.deleteOne({ _id: id})
            res.json({
                success: 1,
                message:'employee deleted successfully',
                
            })


        } catch (error) {
            res.json({
                success: 0,
                message:'something went wrong while deleting employee' + error,
                
            })

        }
    }

})


module.exports = router