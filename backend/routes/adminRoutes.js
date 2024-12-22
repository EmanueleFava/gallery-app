const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateUser, readAllUsersImages, readUserImages, updateImage, deleteImage } = require("../controllers/adminController")

const router = express.Router();


router.put("/:admin_id/updateuser/:user_id", updateUser); // rotta per aggiornare un user tramite id 
router.get("/:admin_id/usersimages", authMiddleware, readAllUsersImages); // rotta per leggere tutte le immagini degli users 
router.get("/:admin_id/userimages/:user_id", authMiddleware, readUserImages); // rotta per leggere tutte le immagini di un user 
router.put("/:admin_id/updateimage/:image_id", authMiddleware, updateImage); // rotta per eseguire l'update di un'immagine tramite id immagien
router.delete("/:admin_id/deleteimage/:user_id/:image_id", authMiddleware, deleteImage) // rotta per cancellare le immagini di un user tramite id user e id immagine 




module.exports = router;