const TableName = {
  COMMENT_REACTIONS: 'comment_reactions'
};

const ColumnName = {
  CREATED_AT: 'created_at',
  ID: 'id',
  IS_LIKE: 'is_like',
  UPDATED_AT: 'updated_at'
};

export async function up(knex) {
  await knex.schema.createTable(TableName.COMMENT_REACTIONS, table => {
    table.increments(ColumnName.ID).primary();
    table.boolean(ColumnName.IS_LIKE).notNullable().defaultTo(true);
    table.dateTime(ColumnName.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    table.dateTime(ColumnName.UPDATED_AT).notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists(TableName.COMMENT_REACTIONS);
}
