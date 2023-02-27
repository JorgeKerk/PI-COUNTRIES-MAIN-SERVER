const { DataTypes } = require('sequelize');
// We export a function that defines the Model
// Then, we inject the connection to sequelize.
module.exports = (sequelize) => {
  // I define the Model
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        min: 1,
        max: 5
      }
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    seasons: {
      type: DataTypes.ARRAY( 
        DataTypes.ENUM( [ 'Summer', 'Autumn', 'Winter', 'Spring' ] ) 
      ),
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};
