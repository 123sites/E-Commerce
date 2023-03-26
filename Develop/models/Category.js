const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  // Define the columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Primary key in SQL is a single, or a group of fields or columns that can
      // identify a row in a table. Putting it simply, it is a column that accepts
      // unique values for each row. Thus, whenever you use the INSERT INTO command 
      // to insert new values in a table, the value for the primary key column or 
      // columns needs to be unique.
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
