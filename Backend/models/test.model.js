module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define(
        "test",
        {
            nom : {
                type: Sequelize.STRING
            },
            email : {
                type: Sequelize.STRING
            }
        });
    return User;
};