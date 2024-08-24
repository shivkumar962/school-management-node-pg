const { DataTypes } = require('sequelize');

module.exports.MediaModel = (sequelize) => {
	return sequelize.define(
		'Media',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			designId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
				  model: 'Designs',
				  key: 'id',
				},
			  },
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			recordStatus: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			createdBy: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			updatedBy: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			// Other model options go here
			freezeTableName: true,
			//tableName: 'tablename',
			timestamps: true,
		}
	);
};
