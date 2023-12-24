const { Model } = require('objection');
const knex = require('../db/index');

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

    static async getChargePointData(chargePointId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;

        const [data, totalCount] = await Promise.all([
            MeterData.query()
            .where('charge_point_id', chargePointId)
            .limit(pageSize)
            .offset(offset),
            MeterData.query()
            .where('charge_point_id', chargePointId)
            .count('id as totalCount')
            .first(),
        ]);

        const totalPages = Math.ceil(totalCount.totalCount / pageSize);

        return {
            page,
            pageSize,
            totalItems: totalCount.totalCount,
            totalPages,
            data,

        };
    }
    static async getChargePointList(chargePointIds, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;

        const [data, totalCount] = await Promise.all([
            MeterData.query()
            .whereIn('charge_point_id', chargePointIds)
            .limit(pageSize)
            .offset(offset),
            MeterData.query()
            .whereIn('charge_point_id', chargePointIds)
            .count('id as totalCount')
            .first(),
        ]);

        const totalPages = Math.ceil(totalCount.totalCount / pageSize);

        return {
            page,
            pageSize,
            totalItems: totalCount.totalCount,
            totalPages,
            data,

        };
    }
}

module.exports = MeterData;