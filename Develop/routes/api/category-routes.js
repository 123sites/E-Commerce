const router = require("express").Router();
const { Category, Product } = require("../../models");

// JavaScript try and catch, # 26, see api.
// The try statement allows you to define a block of code to
// be tested for errors while it is being executed. The catch
// statement allows you to define a block of code to be executed,
// if an error occurs in the try block.

// Promise version below, dose the same as ES 6 async await at bottom:

// The `/api/categories` endpoint
// See Lesson 8 for Route information.
router.get("/", (req, res) => {
  // find all categories, include its associated products
  Category.findAll({
    include: {
      model: Product,
      // See Bootcamp instructions under the name "Product"
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value, include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      // See Bootcamp instructions under the name "Product"
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "ID not found, cannot update the category!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "ID not found, cannot delete this category!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// ES6 Format async await:(same as above)

// const router = require("express").Router();
// const { Category, Product } = require("../../models");

// // The `/api/categories` endpoint
// router.get("/", async (req, res) => {
//   // JavaScript try and catch, # 26, see api.
//   // The try statement allows you to define a block of code to
//   // be tested for errors while it is being executed. The catch
//   // statement allows you to define a block of code to be executed,
//   // if an error occurs in the try block.
//   try {
//     // find all categories with its associated Products
//     const categoryData = await Category.findAll({
//       include: [
//         { model: Product },
//         // It says "ALL" DO I NEED THE BELOW COMMENTED CODE????????????????????????????????????????
//         // DELETE BRACKETS.
//         // if (!categoryData) {
//         //   res
//         //     .status(404)
//         //     .json({
//         //       message: "Sorry, but there are no categories associated with that!",
//         //     });
//       ],
//     });
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     // find one category by its `id` value, include its associated Products
//     const categoryData = await Category.findID(req.params.id, {
//       include: [
//         {
//           model: Product,
//         },
//       ],
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: "No category found with that id!" });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   // create a new category
//   try {
//     const categoryData = await Category.create(req.body);
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   });

// router.put("/:id", async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const categoryData = await Category.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!categoryData) {
//         res.status(404).json({ message: "No category found with that id!" });
//         return;
//       }
//       res.status(200).json(categoryData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

// router.delete("/:id", async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryData = await Category.destroy({
//       where: { id: req.params.id }
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: "Category could not be deleted!" });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
