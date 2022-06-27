const TableName = {
  USERS: 'users',
  COMMENTS: 'comments',
  COMMENT_REACTIONS: 'comment_reactions'
};

const ColumnName = {
  ID: 'id',
  COMMENT_ID: 'comment_id',
  USER_ID: 'user_id'
};

const RelationRule = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL'
};

export async function up(knex) {
  await knex.schema.alterTable(TableName.COMMENT_REACTIONS, table => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(TableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table
      .integer(ColumnName.COMMENT_ID)
      .references(ColumnName.ID)
      .inTable(TableName.COMMENTS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
}

export async function down(knex) {
  await knex.schema.alterTable(TableName.COMMENT_REACTIONS, table => {
    table.dropColumn(ColumnName.USER_ID);
    table.dropColumn(ColumnName.COMMENT_ID);
  });
}
