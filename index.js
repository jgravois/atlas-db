require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize');

const uri = `postgres://${process.env.ATLAS_DB_USER}:${process.env.ATLAS_DB_PASS}@localhost:5433/${process.env.ATLAS_DB}`

const sequelize = new Sequelize(uri)

class LosAngelesAnnexation extends Model {}

LosAngelesAnnexation.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING
  },
  geom: {
    type: DataTypes.GEOMETRY
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  tableName: 'los_angeles_annexations',

  // since sequelize didnt create the table, its missing createdAt/updatedAt
  timestamps: false,
  modelName: 'LosAngelesAnnexation' // We need to choose the model name
});


const go = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const payload = await LosAngelesAnnexation.findAll();
    payload.forEach(result => {
      console.log(result.geom)
    })
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

go()
