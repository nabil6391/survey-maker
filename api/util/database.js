const Sequelize = require('sequelize');

console.log("Does it work")

const sequelize = new Sequelize(process.env.PGDATABASE || 'pg_db',
    process.env.PGUSER || 'nabil',
    process.env.PGPASSWORD || '12345',
    {
        host: process.env.PGHOST || 'node_db',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
    });

module.exports = sequelize;
