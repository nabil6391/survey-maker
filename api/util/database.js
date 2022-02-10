const Sequelize = require('sequelize');

console.log("Does it work")

const sequelize = new Sequelize(process.env.PGDATABASE|| 'postgres',
                                process.env.PGUSER || 'postgres',
                                process.env.PGPASSWORD || '',
                                {
                                    host: process.env.PGHOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres'
                                });

module.exports = sequelize;
