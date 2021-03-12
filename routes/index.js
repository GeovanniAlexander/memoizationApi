const express = require('express');
const router = express.Router();

const dataModel = require('../models/data');

router.get('/:dbSrc', async(req, res) => {
    const dbSrc = req.params.dbSrc;
    const data = await slow_function(dbSrc);
    res.json(data);
})

router.post('/', async(req, res) => {
    const value = req.body.value;
    const key = req.body.key;
    const data = await cache_store(key, value);
    res.json(data);
})

router.get('/byKey/:key', async(req, res) => {
    const key = req.params.key;
    data = await cache_retrieve(key);
    res.json(data);
})

// stores data (value) by key
async function cache_store(key, value) {
    const data = new dataModel({
        key,
        value
    })
    try{
        const newData = await data.save();
        return newData;
    }catch(error){
        return {error};
    }
}

// retrieves data by key (if it exists) 
async function cache_retrieve(key) {
    try {
        const data = await dataModel.findOne({key}, (dbData) => dbData);
        if(data)
            return data
        else
            return { message: 'The data does not exists'};
    } catch (error) {
        return {error};
    }
} 


// fetches data from a slow data source
async function slow_function(input) {
    try{
        if(input === 'myDataSource'){
            const data = await dataModel.find();
            return data;
        }
        else
            return { message: 'The data source does not exists'};
    }catch(error){
        return {error};
    }
}


module.exports = router;