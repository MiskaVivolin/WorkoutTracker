const express = require("express")
const router = express.Router()
const userprs = require("./models")
const { error } = require("console")
const app = express()

router.route("/create").post((req, res) => {
    console.log('Data received:', req.body)
    const name = req.body.name
    const date = req.body.date
    const lift = req.body.lift
    const result = req.body.result

    const newuserPr = new userprs({
        name, date, lift, result
    })
    newuserPr.save()
    res.json({ message: `${newuserPr} Object created`})
})

router.route("/get").get((req, res) => {

    userprs.find({  })
    .then((data) => {
        console.log('Data: ', data)
        res.json(data)
    })
    .catch((error) => {
        console.log('Error retrieving data')
    })
})


router.route("/delete").delete((req, res) => {

    const itemId = req.query.id;
    console.log("Item id: ", itemId)

    console.log(userprs)

    if (!itemId) {
        return res.status(400).json({ message: "Item ID not provided" });
    }

    userprs.findByIdAndDelete(itemId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error deleting item" });
        }

        res.json({ message: `${itemId} deleted` });
    })
    // .then((data) => {
    //     res.json({ok: true})
    //     res.json(data)
    // })
    
})

module.exports = router;