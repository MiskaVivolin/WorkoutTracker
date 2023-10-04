const routerExpress = require("express")
const router = routerExpress.Router()
const userPrs = require("./models")


interface DataItem {
    id: number;
    name: string;
    date: string;
    lift: string;
    result: string;
}

router.route("/create").post((req: {body: { name: string; date: string; lift: string; result: string; }}, res: { json: (args: { message: string; }) => void; }) => {

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
            .then((data: JSON) => {
            res.json({ message: `${data} Object created` });
            console.log(`${data} Object created\n`);
        })
            .catch((err: JSON) => {
            res.json({ message: "Error creating object" });
            console.log("Error creating object", err);
        });
    }
})

router.route("/get").get((req: string, res: {json: (args: DataItem | {message: string}) => void;}) => {

    userPrs.find({})
    .then((data: DataItem) => {
        res.json(data)
    })
    .catch((err: string) => {
        res.json({ message: "Error retrieving data"})
        console.log('Error retrieving data', err)
    })
})


router.route("/delete").delete((req: {query: {id: number}}, res: {json: (args: {message: string}) => void;}) => {
    
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