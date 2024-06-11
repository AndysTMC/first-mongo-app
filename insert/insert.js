const express = require('express')  
let mongodb = require('mongodb')
let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.post('/', (req, res) => {
    let obj = req.body;
    mcl.connect(url, (err, conn) => {
        if (err) console.log(err);
        else {
            let db = conn.db('nodedb');
            db.collection('Products').insertOne(obj, (err, result) => {
                if (err) console.log(err);
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })
})

module.exports = router