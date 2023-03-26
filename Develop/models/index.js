// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Refer to 13 ORM: Lesson 24 for help.
Product.belongsTo(Category, {
  // A FOREIGN KEY is a field (or collection of fields) 
  // in one table, that refers to the PRIMARY KEY in another 
  // table. The table with the foreign key is called the child table, 
  // & the table with the primary key is called the referenced or parent table.
  foreignKey: 'category_id',
  onDelete: 'CASCADE',

})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
