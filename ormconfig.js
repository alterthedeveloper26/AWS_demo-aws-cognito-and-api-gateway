/**
 * Datasource config only for pipeline env migration (SIT, UAT and PRD)
 * Typeorm will load configuration from .env automatically. We are not able to load .env.local
 * In pipeline env, configurations will all stored in .env.
 * While in our local, we are using .env.local.
 * Ref: https://github.com/typeorm/typeorm/issues/3420
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/modules/models/**/*.entity.js'],
  migrationsTableName: 'migration_histories',
  extra: {
    ssl: process.env.DB_SSL === 'true'
  },
  migrations: ['src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  }
};
