module.exports = (sequelize,Sequelize) => {
    const Photo = sequelize.define(
        "photo",
        {
            url : {
                type: Sequelize.STRING
            },
            actif : {
                type: Sequelize.INTEGER
            }
        });
    return Photo;
};