require('dotenv').config();

const seeder = require('mongoose-seed');
const seedData = require('./seedData');

seeder.connect(process.env.LOCAL_DB_URL, () => {
  seeder.loadModels([
    './models/User.js',
    './models/Content.js',
    './models/IndividualRating.js',
    './models/AllRating.js'
  ]);

  seeder.clearModels(['User', 'Content', 'IndividualRating', 'AllRating'], () => {
    seeder.populateModels(seedData, () => {
      seeder.disconnect();
    });
  });
});
