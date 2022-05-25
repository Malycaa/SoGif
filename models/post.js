'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User,{
        foreignKey: "UserId"
      })
    }


  }
  Post.init({
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Image URL is required`
        }
      }
    },
    like: DataTypes.INTEGER,
    UserId: DataTypes.STRING,
    caption:{
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Caption is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};