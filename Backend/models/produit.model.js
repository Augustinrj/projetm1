module.exports = (sequelize,Sequelize) => {
    const Produit = sequelize.define(
        "produit",
        {
            nomprod : {
                type: Sequelize.STRING
            },
            id_vendeur : {
                type: Sequelize.INTEGER
            },
            id_cat : {
                type: Sequelize.INTEGER
            },
            prix : {
                type: Sequelize.INTEGER
            },
            actif : {
                type: Sequelize.INTEGER
            },
            ref : {
                type: Sequelize.INTEGER
            },
            description :{
                type : Sequelize.TEXT
            },
            stock :{
                type : Sequelize.INTEGER
            },
            photoUrl : {
                type: Sequelize.STRING
            }
        });
    return Produit;
};