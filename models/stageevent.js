'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StageEvent.init({
    stageevent_id: DataTypes.INTEGER,
    stageevent_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StageEvent',
  });
  return StageEvent;
};