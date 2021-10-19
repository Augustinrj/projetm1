module.exports = (sequelize,Sequelize) => {
    const Categorie = sequelize.define(
        "categorie",
        {
            libelle : {
                type: Sequelize.STRING
            },
            actif : {
                type: Sequelize.INTEGER
            }
        });
    return Categorie;
};