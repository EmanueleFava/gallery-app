const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const TokenBlacklist = sequelize.define("TokenBlacklist", {
	token_id: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = TokenBlacklist;
