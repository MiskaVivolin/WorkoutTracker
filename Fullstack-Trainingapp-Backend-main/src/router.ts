const routerExpress = require("express")
const router = routerExpress.Router()
const userPrs = require("./models")
import { DataItem, PostReq, PostRes, GetRes, DeleteReq, DeleteRes } from "./types/types";


router.route("/create").post((req: PostReq, res: PostRes) => {

    const name = req.body.name
    const date = req.body.date
    const lift = req.body.lift
    const result = req.body.result

    if (req.body.name === '' || undefined || req.body.date === '' || undefined || req.body.lift === '' || undefined || req.body.result === '' || undefined) {
        res.json({ message: "Error: object has empty or undefined fields" });
    }
    else {
        const newuserPr = new userPrs({
            name, date, lift, result
        });
        newuserPr.save()
            .then((data: string) => {
            res.json({ message: `${data} Object created` });
            console.log(`${data} Object created\n`);
        })
            .catch((err: string) => {
            res.json({ message: "Error creating object" });
            console.log("Error creating object", err);
        });
    }
})

router.route("/get").get((req: string, res: GetRes) => {

    userPrs.find({})
    .then((data: DataItem) => {
        res.json(data)
    })
    .catch((err: JSON) => {
        res.json({ message: "Error retrieving data"})
        console.log('Error retrieving data', err)
    })
})


router.route("/delete").delete((req: DeleteReq, res: DeleteRes) => {
    
    userPrs.findByIdAndDelete(req.query.id)
    .then((data: string) => {
        res.json({ message: `Object: ${data} deleted`})
        console.log(`Object: ${data} deleted\n`)
    })
    .catch((err: string) => {
        res.json({ message: "Error deleting object" })
        console.log("Error deleting object", err)
    })
})

module.exports = router;