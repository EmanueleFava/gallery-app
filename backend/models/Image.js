const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Image = sequelize.define("Image", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Image;
