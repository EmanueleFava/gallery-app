const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Image = require("./Image");

const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true, // Assicurati che sia unico
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	ruolo: {
		type: DataTypes.STRING,
	},
	photo_count: {
		type: DataTypes.INTEGER,
	},
});

Image.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Image, { foreignKey: "user_id" });


module.exports = User;
