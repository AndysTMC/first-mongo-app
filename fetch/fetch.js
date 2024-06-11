const express = require('express')
let mongodb = require('mongodb')
let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.get('/', (req, res) => {
    mcl.connect(url, (err, conn) => {
        if (err) throw err
        let db = conn.db('nodedb')
        db.collection('Products').find().toArray((err, array) => {
            if (err) throw err
            res.send(array)
            db.close()
        })
    })
})

module.exports = router