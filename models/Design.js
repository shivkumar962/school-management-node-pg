const { DataTypes } = require('sequelize');

module.exports.DesignsModel = (sequelize) => {
	return sequelize.define(
		'Designs',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			designName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			recordStatus: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			// Other model options go here
			freezeTableName: true,
			//tableName: 'tablename',
			timestamps: true,
		}
	);
};
