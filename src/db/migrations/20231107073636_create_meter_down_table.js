/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("meter_data", function (table) {
    table.increments("id").primary();
    table.string("charge_point_id").notNullable();
    table.jsonb("payload").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index("charge_point_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("meter_data");
};
