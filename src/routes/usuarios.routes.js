const { Router } = require('express')
const router = Router()

router.post('/register', registerUser)


module.exports = router