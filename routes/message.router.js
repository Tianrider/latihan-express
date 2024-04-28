const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.get("/", messageController.getAllMessage);
router.get("/:id", messageController.getMessageByUserId);
router.post("/", messageController.postMessage);

module.exports = router;
