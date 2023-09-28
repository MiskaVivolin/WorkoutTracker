const express = require("express")
const router = express.Router()
const userprs = require("./models")
const { error } = require("console")
const app = express()

router.route("/create").post((req, res) => {

    const name = req.body.name
    const date = req.body.date
    const lift = req.body.lift
    const result = req.body.result

    if(req.body.name !== '' || undefined && req.body.date !== '' || undefined && req.body.list !== '' || undefined && req.body.result !== '' || undefined) {
        const newuserPr = new userprs({
            name, date, lift, result
        })
        newuserPr.save()
        .then(data => {
            res.json({ message: `${data} Object created`})
            console.log(`${data} Object created\n`)
        })
        .catch(err => {
            res.json({ message: "Error creating object"})
            console.log("Error creating object", err)
        })
    } else {
        res.json({ message: "Error: object has empty or undefined fields" })
    }
})

router.route("/get").get((req, res) => {

    userprs.find({})
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({ errorMessage: "Error retrieving data"})
        console.log('Error retrieving data', err)
    })
})


router.route("/delete").delete((req, res) => {
    
    userprs.findByIdAndDelete(req.query.id)
    .then(data => {
        res.json({ message: `Object: ${data} deleted`})
        console.log(`Object: ${data} deleted\n`)
    })
    .catch(err => {
        res.json({ message: "Error deleting object" })
        console.log("Error deleting object", err)
    })
})

module.exports = router;