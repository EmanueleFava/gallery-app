const User = require("../models/User");
const Image = require("../models/Image");

const createImage = async (req, res) => {
	const { user_id } = req.params;
	const { title, url } = req.body;

	try {
		const user = await User.findOne({ where: { id: user_id } });
		if (user.photo_count == 3 && user.ruolo == "utente") {
			return res.status(401).json({
				error: "Limite foto raggiungo, passa a premium per caricare ulteriori foto!",
			});
		} else if (user.photo_count == 10 && user.ruolo == "utente premium") {
			return res.status(401).json({ error: "Limite foto raggiungo!" });
		} else {
			const image = await Image.create({
				user_id,
				title,
				url,
			});
			const userUpdateCount = await User.update(
				{
					photo_count: User.sequelize.literal("photo_count + 1"),
				},
				{
					where: {
						id: user_id,
					},
				},
			);
			res.status(201).json(image);
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: `Bad request` });
	}
};

const updateImage = async (req, res) => {
	const { user_id } = req.params;
	const { title } = req.body;
	const { id } = req.params;

	// Controllo del titolo
	if (!title) {
		return res.status(400).json({ error: "Title is required" });
	}

	try {
		// Trova l'immagine associata all'utente
		const image = await Image.findOne({ where: { id, user_id } });
		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		// Aggiorna l'immagine
		const [updatedRows] = await Image.update(
			{ title: title },
			{ where: { id: id, user_id: user_id } },
		);

		if (updatedRows === 0) {
			return res.status(404).json({ error: "Image not updated" });
		}

		// Recupera l'immagine aggiornata
		const updatedImage = await Image.findOne({ where: { id } });

		// Rispondi con successo
		res.status(200).json({
			messaggio: `Immagine aggiornata con successo`,
			updatedImage,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			details: error.message,
		});
	}
};

const readImages = async (req, res) => {
	const { user_id } = req.params;

	try {
		const images = await Image.findAll({
			where: {
				user_id: user_id,
			},
		});
		res.json(images);
	} catch (error) {
		res.status(404).json({ error: "images not found", error });
	}
};

const readAllUserImages = async (req, res) => {
	const { user_id } = req.params;

	try {
		const user = await User.findOne({ where: { id: user_id } });
		if (!user) {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		}
		try {
			const images = await Image.findAll();
			res.json(images);
		} catch (error) {
			return res.status(404).json({ error: "images not found", error });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const readImage = async (req, res) => {
	const { user_id } = req.params;
	const { id } = req.params;

	try {
		const image = await Image.findOne({
			where: {
				user_id: user_id,
				id: id,
			},
		});
		res.json(image);
	} catch (error) {
		res.status(404).json({ error: "images not found", error });
	}
};

const deleteImage = async (req, res) => {
	const { user_id } = req.params;
	const { id } = req.params;

	try {
		const image = await Image.destroy({
			where: {
				id: id,
			},
		});

		const userUpdateCount = await User.update(
			{
				photo_count: User.sequelize.literal("photo_count - 1"),
			},
			{
				where: {
					id: user_id,
				},
			},
		);

		if (image === 0) {
			return res.status(404).json({ error: "Image not found" });
		}

		res.status(200).json({ message: "Image deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createImage,
	updateImage,
	readImages,
	readAllUserImages,
	readImage,
	deleteImage,
};
