module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define(
        "users",
        {
            nom : {
                type: Sequelize.STRING
            },
            email : {
                type: Sequelize.STRING
            },
            username : {
                type: Sequelize.STRING
            },
            password : {
                type: Sequelize.STRING
            },
            role_id : {
                type: Sequelize.INTEGER
            },
            avatar_id : {
                type: Sequelize.INTEGER
            },
            verification : {
                type: Sequelize.INTEGER
            }
        });
    return User;
};