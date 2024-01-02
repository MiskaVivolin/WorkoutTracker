const routerExpress = require("express")
const router = routerExpress.Router()
const userPrs = require("./models")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import type { DataItem, PostReq, PostRes, GetRes, DeleteReq, DeleteRes, GetItemReq } from "./types/types";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 4 },
  password: { type: String, required: true, minlength: 10, unique: true },
});

userSchema.index({ password: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

router.post('/signup', async (req: any, res: any) => {
  const { username, password } = req.body.validationFields;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // User with the given username doesn't exist
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });
      
      await newUser.save();
      
      res.json({ isTaken: false });
    } else {
      res.json({ isTaken: true });
    }
  } catch (error) {
    console.error('Error checking username and password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req: any, res: any) => {

  const { username, password } = req.body.validationFields;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

  res.json({ token });
});

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
            res.json({ message: `Object ${data} created` });
            console.log(`Object ${data} created\n`);
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

router.route("/get/:id").get((req: GetItemReq, res: any) => {

    userPrs.findById(req.params.id)
    .then((data: string) => {
        res.json(data)
        console.log(`Object ${data} acquired\n`)
    })
    .catch((err: string) => {
        res.json({ message: 'Error retrieving specific object' })
        console.log(err)
    })
})

router.route("/put/:id").put((req: any, res: any) => {

    const { name, date, lift, result } = req.body
    userPrs.findOneAndUpdate(
        { _id: req.params.id },
        { name, date, lift, result },
        { new: true, useFindAndModify: false }
    )
    .then((data: string) => {
        res.json({message: `Object ${data} updated`})
        console.log(`Object ${data} updated\n`)
    })
    .catch((err: string) => {
        res.json('Error updating object')
        console.log('Error updating object', err)
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