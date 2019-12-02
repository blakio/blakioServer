const router = require("express").Router()

router.get("/eps", (req, res) => {
  res.json({
    epsActive: true
  })
})

module.exports = router;
