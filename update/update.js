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
            db.collection('Products').updateOne(
                { 'pid': obj.pid },
                { $set: { 'pname': obj.pname, 'price': obj.price } },
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.json({ 'update': 'error' })
                    }
                    else {
                        if(result.matchedCount != 0) {
                            console.log("Data updated")
                            res.json({ 'update': 'success' })
                        } else {
                            console.log("Data not found")
                            res.json({ 'update': 'failed' })
                        }
                    }
                }
                conn.close()
            )
        }
    })
})

module.exports = router