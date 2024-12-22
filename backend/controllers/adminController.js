const User = require("../models/User");
const Image = require("../models/Image");

const updateUser = async (req, res) => {
	const { admin_id, user_id } = req.params;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });
		if (!admin || admin.ruolo != "admin") {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		} else {
			try {
				const user = await User.findOne({ where: { id: user_id } });
				if (user.ruolo == "utente") {
					const update = await User.update(
						{
							ruolo: "utente premium",
						},
						{
							where: { id: user_id },
						},
					);
					const updatedUser = await User.findOne({
						where: { id: user_id },
					});
					res.status(200).json({
						messaggio: `utente aggiornato`,
						updatedUser,
					});
				} else {
					const update = await User.update(
						{
							ruolo: "utente",
						},
						{
							where: { id: user_id },
						},
					);
					const updatedUser = await User.findOne({
						where: { id: user_id },
					});
					res.status(200).json({
						messaggio: `utente aggiornato`,
						updatedUser,
					});
				}
			} catch (error) {
				return res.status(500).json({
					error: "Errore durante l'aggiornamento dell'utente.",
				});
			}
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Errore durante la verifica dell'amministratore." });
	}
};

const readAllUsersImages = async (req, res) => {
	const { admin_id } = req.params;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });
		if (admin.ruolo == "admin") {
			try {
				const images = await Image.findAll();
				res.json(images);
			} catch (error) {
				return res
					.status(404)
					.json({ error: "images not found", error });
			}
		} else {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		}
	} catch (error) {
		return res.status(404).json({ error: "User admin not found" });
	}
};

const readUserImages = async (req, res) => {
	const { admin_id, user_id } = req.params;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });
		if (!admin || admin.ruolo != "admin") {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		} else {
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
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Errore durante la verifica dell'amministratore." });
	}
};

const updateImage = async (req, res) => {
	const { admin_id, image_id } = req.params;
	const { title } = req.body;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });
		if (!admin || admin.ruolo != "admin") {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		} else {
			try {
				const image = await Image.findOne({
					where: { id: image_id },
				});
				if (image) {
					const update = await Image.update(
						{
							title: title,
						},
						{
							where: { id: image_id },
						},
					);
				}
				const updatedImage = await Image.findOne({
					where: { id: image_id },
				});
				return res
					.status(200)
					.json({ messaggio: `immagine aggiornata`, updatedImage });
			} catch (error) {
				return res
					.status(404)
					.json({ error: "images not found", error });
			}
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Errore durante la verifica dell'amministratore." });
	}
};

const deleteImage = async (req, res) => {
	const { admin_id, user_id, image_id } = req.params;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });

		if (!admin || admin.ruolo != "admin") {
			return res
				.status(403)
				.json({ error: "Accesso negato. Utente non autorizzato." });
		} else {
			const image = await Image.destroy({
				where: {
					id: image_id,
				},
			});

			if (image === 0) {
				return res.status(404).json({ error: "Image not found" });
			}

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

			res.status(200).json({ message: "Image deleted successfully" });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Errore durante la verifica dell'amministratore." });
	}
};

module.exports = {
	updateUser,
	readAllUsersImages,
	readUserImages,
	updateImage,
	deleteImage,
};
