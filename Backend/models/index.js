const Sequelize = require("sequelize");
const sequelize = new Sequelize("e_tsena","auguste","augustin06",{
    host:"localhost",
    dialect:"mysql",
    operatosAliases:true,
    pool :{
        max : 20,
        min : 0,
        acquire :30000,
        idle : 10000
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.test = require("./test.model.js")(sequelize,Sequelize);
db.users = require("./users.model.js")(sequelize,Sequelize);
db.categorie = require("./categorie.model.js")(sequelize,Sequelize);
db.commande = require("./commande.model.js")(sequelize,Sequelize);
db.detailcommande = require("./detailcommande.model.js")(sequelize,Sequelize);
db.photo = require("./photo.model.js")(sequelize,Sequelize);
db.produit = require("./produit.model.js")(sequelize,Sequelize);

module.exports = db;