const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Pokemons", {
        id: { type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,primaryKey: true },

    name: { type: DataTypes.STRING, allowNull: false },
    Imagen: { type: DataTypes.STRING },
    Vida: { type: DataTypes.BIGINT, },
    Ataque: { type: DataTypes.BIGINT, allowNull: false },
    Defensa: { type: DataTypes.BIGINT, allowNull: false },
    Velocidad: { type: DataTypes.BIGINT },
    Altura: { type: DataTypes.DECIMAL },
    Peso: { type: DataTypes.DECIMAL },
  });
};
