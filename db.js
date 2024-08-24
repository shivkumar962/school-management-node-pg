require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		dialect: 'postgres' /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	}
);

(async () => {
	try {
		await sequelize.authenticate();
		console.log('💾 Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

// Create Models
const { TaskModel } = require('./models/Task');
const Task = TaskModel(sequelize);

const { UserModel } = require('./models/User');
const User = UserModel(sequelize);

const { DesignsModel } = require('./models/Design');
const Designs = DesignsModel(sequelize);

const { MediaModel } = require('./models/media')
const Media = MediaModel(sequelize);


// Relationships
Designs.hasMany(Media, {
	foreignKey: 'designId',
	sourceKey: 'id', // Optional, yeh by default `id` hota hai
  });
  
  Media.belongsTo(Designs, {
	foreignKey: 'designId',
	targetKey: 'id', // Optional, yeh by default `id` hota hai
  });
  

if (process.env.MIGRATE_DB == 'TRUE') {
	sequelize.sync({ alter: true}).then(() => {
		console.log(`All tables synced!`);
		process.exit(0);
	});
}

module.exports = {
	Task,
	User,
	Designs,
	Media
};
