'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Email.belongsTo(models.User);
      Email.hasMany(models.EmailTag);
      Email.belongsToMany(models.Tag, { through: models.EmailTag });
    }
    showStatus() {
      if (this.status === "Sent") {
        return "Message succesfully sent!"
      } else {
        return "Message is failed to sent!"
      }
    }
  }
  Email.init({
    sentTo: DataTypes.STRING,
    subject: DataTypes.STRING,
    html: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
};