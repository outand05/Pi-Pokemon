const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Pokemons", {
        id: { type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,primaryKey: true },

    name: { type: DataTypes.STRING, allowNull: false,unique:true },
    imagen: { type: DataTypes.STRING,unique:true },
    vida: { type: DataTypes.BIGINT, },
    ataque: { type: DataTypes.BIGINT, allowNull: false },
    defensa: { type: DataTypes.BIGINT, allowNull: false },
    velocidad: { type: DataTypes.BIGINT },
    altura: { type: DataTypes.DECIMAL },
    Peso: { type: DataTypes.DECIMAL },
  });
};
