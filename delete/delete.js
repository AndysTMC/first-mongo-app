const express = require('express')  
let mongodb = require('mongodb')
let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.post('/', (req, res) => {
    let obj = {
        p_id: req.body.p_id,
    }
    mcl.connect(url, (err, conn) => {
        if (err) console.log(err);
        else {
            let db = conn.db('nodedb');
            db.collection('Products').deleteOne(
                obj,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        res.json({ 'delete': 'error' })
                    }
                    else {
                        if(result.deletedCount != 0) {
                            console.log("Data deleted")
                            res.json({ 'delete': 'success' })
                        } else {
                            console.log("Data not found")
                            res.json({ 'delete': 'failed' })
                        }
                    }
                    conn.close()
                }
            )
        }
    })
})

module.exports = router