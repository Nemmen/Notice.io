const express = require("express")
const router = express.Router()



const { login, signup , getusers ,deleteUser } = require("../controller/auth")

const { auth, isStudent, isAdmin } = require("../middleware/auth")

// router.post("/login", login)
router.post("/signup", signup)
router.post("/login", login)
router.get("/getusers", getusers)
router.delete("/:id", deleteUser)

//protected route

router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "the user is authentic"
    })
})

router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to the protected route for the student"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to the protected route for the Admin"
    })
})

module.exports = router