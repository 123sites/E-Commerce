const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// See Lesson 8 for Route information.
router.get('/', (req, res) => {
  // find all tags & include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        // See Bootcamp instructions under the name "Product"  
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    if(!dbTagData) {
      res.status(404).json({ message: 'No product found!  Choose another product.' });
      return;
    }
    res.json(dbTagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  router.get('/:id', (req, res) => {
    // find a single tag by its `id`, include its associated Product data
    Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        // See Bootcamp instructions under the name "Product"
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
      .then(dbTagData => res.json(dbTagData))
      if(!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
  });

  router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
      tag_name: req.body.tag_name
    })
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
  });

  router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id!' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
      where: {
        id: req.params.id 
      }
    })
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id, nothing deleted!' });
          return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

  module.exports = router;
