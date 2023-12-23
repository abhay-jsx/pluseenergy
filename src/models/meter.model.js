const { Model } = require('objection');
const knex  = require('../db/index');

Model.knex(knex);

class MeterData extends Model {
  static get tableName() {
    return 'meter_data';
  }

  static get jsonAttributes() {
    return ['payload'];
  }

  static async addMeterData(data) {
    const result = await MeterData.query().insert(data).returning('*').skipUndefined();
    return result;
  }

  static async getChargePointData(chargePointId) {
    const data = await MeterData.query().where('charge_point_id', chargePointId);
    return data;
  }
  static async getChargePointList(chargePointIds, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
  
    const data = await MeterData.query()
      .whereIn('charge_point_id', chargePointIds)
      .limit(pageSize)
      .offset(offset);
  
    return data;
  }
}

module.exports = MeterData;
