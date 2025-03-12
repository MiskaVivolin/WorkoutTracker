import express from "express";
import { createWorkoutItem, deleteWorkoutItem, editWorkoutItem, getWorkoutData, getWorkoutItem, userLogin, userSignup } from "./models";
import { PostReq, PostRes, GetRes, UserData, SignupRes, LoginRes, GetReq, GetItemReq, EditReq, EditRes, DeleteReq, DeleteRes } from "./types/types";

const router = express.Router()


router.post("/signup", async (req: UserData, res: SignupRes) => {
  try {
    const { username, password } = req.body.validationFields;

    const signUp = await userSignup(username, password)
    if (!signUp) {
      res.status(409).json({ isTaken: true })
    } else {
      res.status(201).json({ isTaken: false })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})


router.post("/login", async (req: UserData, res: LoginRes) => {
  try {
    const { username, password } = req.body.validationFields;
    
    const user = await userLogin(username, password)
    if (user === "Invalid username" ) {
      return res.status(401).json({ message: user })
    }    
    if (user === "Invalid password") {
      return res.status(403).json({ message: user })
    }
    res.status(200).json({ token: user })
  } catch (error) {
    res.status(500).json({ error: "internal server error" })
  }
})


router.post("/create", async (req: PostReq, res: PostRes) => {
  try {
    const { name, date, exercise, result } = req.body.workoutItem
    const { username } = req.body

    if (!username || !name || !date || !exercise || !result) {
      return res.status(422).json({ error: "Missing required fields" });
    }
    
    const newWorkoutData = await createWorkoutItem({ username, name, date, exercise, result })
    res.status(200).json(newWorkoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})


router.get("/get", async (req: GetReq, res: GetRes) => {
  try {
    const username = req.query.token

    const workoutData = await getWorkoutData(username)
    res.status(200).json(workoutData)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/get/:id", async (req: GetItemReq, res: GetRes) => {
  try {
    const itemId = req.params.id

    const workoutItem = await getWorkoutItem(itemId)
    res.status(200).json(workoutItem)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/put", async (req: EditReq, res: EditRes) => {
  try {
    const workoutItem = req.body

    const editedWorkoutItem = await editWorkoutItem(workoutItem)
    res.status(200).json(editedWorkoutItem)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

router.delete("/delete/:id", async (req: DeleteReq, res: DeleteRes) => {
  try {
    const itemId = req.params.id

    const deletedWorkoutItem = await deleteWorkoutItem(itemId)
    res.status(200).json(deletedWorkoutItem)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router;