const User = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", { // Change table name to "Product" (singular)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN
    },
    img: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    rating: {
      type: DataTypes.FLOAT
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  //Product.belongsTo(User, { foreignKey: 'createdby', as: 'CreatedBy' }); // Use User model as the alias

  return Product;
};

