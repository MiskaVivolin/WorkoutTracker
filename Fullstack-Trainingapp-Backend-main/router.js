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

    if(req.body.name !== '' && req.body.date !== '' && req.body.list !== '' && req.body.result !== '') {
        const newuserPr = new userprs({
            name, date, lift, result
        })
        newuserPr.save()
        .then(data => {
            res.json({ successMessage: `${data} Object created`})
            console.log(`${data} Object created\n`)
        })
        .catch(err => {
            res.json({ errorMessage: "Error creating object"})
            console.log("Error creating object", err)
        })
    } else {
        res.json({ errorMessage: "Fill the required fields!" })
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
        res.json({ successMessage: `Object: ${data} deleted`})
        console.log(`Object: ${data} deleted\n`)
    })
    .catch(err => {
        res.json({ errorMessage: "Error deleting object" })
        console.log("Error deleting object", err)
    })
})

module.exports = router;