const express = require("express");
const {
	createImage,
	updateImage,
	readImages,
	readAllUserImages,
	readImage,
	deleteImage,
} = require("../controllers/imageController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:user_id/create", authMiddleware, createImage); // rotta per creare immagini
router.put("/:user_id/updateImage/:id", authMiddleware, updateImage); // rotta per aggiornare immagine tramite id immagine
router.get("/:user_id/gallery/", authMiddleware, readImages); // rotta per leggere tutte le immagini
router.get("/:user_id/publicGallery/", authMiddleware, readAllUserImages); // rotta per leggere tutte le immagini degli utenti
router.get("/:user_id/gallery/:id", authMiddleware, readImage); // rotta per leggere una singola immagine tramite id
router.delete("/:user_id/deleteImage/:id", authMiddleware, deleteImage); // rotta per cancellare una singola immagine tramite id

module.exports = router;
