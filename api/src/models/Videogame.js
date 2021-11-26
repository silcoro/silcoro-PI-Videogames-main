const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.TEXT,
      // allowNull:false
    },
    fecha_Lanzamiento:{
      type: DataTypes.DATEONLY,
      // allowNull:false
    },
    rating:{
      type:DataTypes.FLOAT,
      // allowNull:false
    },
    platforms:{
      type: DataTypes.JSON,
      // allowNull: false
    },
    image:{
      type:DataTypes.TEXT,
      // allowNull:false
    }
  });
};
