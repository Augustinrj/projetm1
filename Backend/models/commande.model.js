module.exports = (sequelize,Sequelize) => {
    const Commande = sequelize.define(
        "commande",
        {
            idpers : {
                type: Sequelize.INTEGER
            },
            actif : {
                type: Sequelize.INTEGER
            }
        });
    return Commande;
};