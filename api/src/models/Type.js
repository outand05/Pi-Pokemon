const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Type", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
