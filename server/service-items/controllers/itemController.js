const { Item, Ingredient, Category, sequelize } = require('../models');

module.exports = {
  getItems: async (req, res, next) => {
    try {
      const showItem = await Item.findAll({
        include: [
          {
            model: Category,
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      if (showItem.length === 0) {
        throw new Error('Item not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success get all items from database`,
        data: showItem,
      });
    } catch (error) {
      next(error);
    }
  },

  addItem: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        ingredients,
        authorId,
      } = req.body;

      const createNewItem = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: trx }
      );

      let newIngredients;

      if (ingredients) {
        const ingredientsData = ingredients.map((ingredient) => {
          if (typeof ingredient === 'string') {
            return {
              name: ingredient,
              itemId: createNewItem.id,
            };
          } else {
            return {
              ...ingredient,
              itemId: createNewItem.id,
            };
          }
        });

        newIngredients = await Ingredient.bulkCreate(ingredientsData, {
          transaction: trx,
        });
      }

      await trx.commit();

      const responseData = {
        ...createNewItem.dataValues,
        ingredients: newIngredients,
      };

      res.status(201).json({
        statusCode: 201,
        message: `Item ${createNewItem.name} and ingredients added successfully`,
        data: responseData,
      });
    } catch (error) {
      await trx.rollback();
      next(error);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedItem = await Item.findByPk(id);

      if (!deletedItem) {
        throw new Error('Item and ingredients not found');
      }

      const deletedIngredients = await Ingredient.findAll({
        where: {
          itemId: deletedItem.id,
        },
      });

      await Item.destroy({
        where: {
          id,
        },
      });

      const responseData = {
        ...deletedItem.dataValues,
        ingredients: deletedIngredients,
      };

      await res.status(200).json({
        statusCode: 200,
        message: `Success delete ${deletedItem.name}`,
        data: responseData,
      });
    } catch (error) {
      next(error);
    }
  },
  editItem: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      const { id: itemId } = req.params;
      const {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId,
        ingredients,
      } = req.body;

      const existingItem = await Item.findByPk(itemId, { transaction: trx });

      if (!existingItem) {
        throw new Error('Item not found');
      }

      await existingItem.update(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: trx }
      );

      await Ingredient.destroy({ where: { itemId: itemId }, transaction: trx });

      let updatedIngredients;

      if (ingredients) {
        const ingredientsData = ingredients.map((ingredient) => {
          if (typeof ingredient === 'string') {
            return {
              name: ingredient,
              itemId: existingItem.id,
            };
          } else {
            return {
              ...ingredient,
              itemId: existingItem.id,
            };
          }
        });

        updatedIngredients = await Ingredient.bulkCreate(ingredientsData, {
          transaction: trx,
        });
      }

      await trx.commit();

      const responseData = {
        ...existingItem.dataValues,
        ingredients: updatedIngredients,
      };

      res.status(200).json({
        statusCode: 200,
        message: `Item ${existingItem.name} and ingredients updated successfully`,
        data: responseData,
      });
    } catch (error) {
      await trx.rollback();
      next(error);
    }
  },

  itemDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const getDetail = await Item.findOne({
        where: {
          id,
        },
        include: Category,
      });

      const getIngredients = await Ingredient.findAll({
        where: {
          itemId: id,
        },
      });

      if (!getDetail || !getIngredients) {
        throw new Error('Item not found');
      }

      const responseData = {
        ...getDetail.dataValues,
        ingredients: getIngredients,
      };

      res.status(200).json({
        statusCode: 200,
        message: `Success get item detail for ${getDetail.name}`,
        data: responseData,
      });
    } catch (error) {
      next(error);
    }
  },

  getIngredient: async (req, res, next) => {
    try {
      const { id } = req.params;

      const getIngredients = await Ingredient.findAll({
        where: {
          itemId: id,
        },
      });

      if (!getIngredients) {
        throw new Error('Ingredient not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success get all ingredients from database`,
        data: getIngredients,
      });
    } catch (error) {
      next(error);
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        throw new Error('Category not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success get category from database`,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
};
