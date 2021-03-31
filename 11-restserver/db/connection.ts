import { Sequelize } from 'sequelize';

const db = new Sequelize('cafeDB', 'anieto', 'anieto', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

export default db;