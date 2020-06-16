module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ncaa-pool-node',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  testing: {
    client: 'pg',
    connection: 'postgres://localhost/ncaa-pool-node',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
