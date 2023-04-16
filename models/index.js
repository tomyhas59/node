const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Image = require("./image.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);
db.Hashtag = require("./hashtag.js")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
