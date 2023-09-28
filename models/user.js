'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Email);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required!"
        },
        isEmail: {
          msg: "Is not Email"
        },
        notEmpty: {
          msg: "Email is required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required!"
        },
        notEmpty: {
          msg: "Password is required!"
        },
        min: {
          args: 8,
          msg: "Minimal password is 8!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role is required!"
        },
        notEmpty: {
          msg: "Role is required!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};