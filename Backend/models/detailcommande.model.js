module.exports = (sequelize,Sequelize) => {
    const Detailcommande = sequelize.define(
        "detailscomm",
        {
            idpro : {
                type: Sequelize.INTEGER
            },
            idcommande : {
                type: Sequelize.INTEGER
            },
            nombre : {
                type: Sequelize.INTEGER
            }
        });
    return Detailcommande;
};