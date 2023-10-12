"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerExpress = require("express");
const router = routerExpress.Router();
const userPrs = require("./models");
router.route("/create").post((req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const lift = req.body.lift;
    const result = req.body.result;
    if (req.body.name === '' || undefined || req.body.date === '' || undefined || req.body.lift === '' || undefined || req.body.result === '' || undefined) {
        res.json({ message: "Error: object has empty or undefined fields" });
    }
    else {
        const newuserPr = new userPrs({
            name, date, lift, result
        });
        newuserPr.save()
            .then((data) => {
            res.json({ message: `${data} Object created` });
            console.log(`${data} Object created\n`);
        })
            .catch((err) => {
            res.json({ message: "Error creating object" });
            console.log("Error creating object", err);
        });
    }
});
router.route("/get").get((req, res) => {
    userPrs.find({})
        .then((data) => {
        res.json(data);
    })
        .catch((err) => {
        res.json({ message: "Error retrieving data" });
        console.log('Error retrieving data', err);
    });
});
router.route("/delete").delete((req, res) => {
    userPrs.findByIdAndDelete(req.query.id)
        .then((data) => {
        res.json({ message: `Object: ${data} deleted` });
        console.log(`Object: ${data} deleted\n`);
    })
        .catch((err) => {
        res.json({ message: "Error deleting object" });
        console.log("Error deleting object", err);
    });
});
module.exports = router;
