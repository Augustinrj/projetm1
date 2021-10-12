const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body.nom && !req.body.role_id && !req.body.email && !req.body.password){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }

    //create user
    const user = {
        nom : req.body.nom,
        email : req.body.email,
        password : req.body.password,
        role_id : req.body.role_id,
        verification : 0
    }

    //Save user
    User.create(user)
        .then(data=>{res.send(data)})
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the user"
            });
        });
};

exports.findAll = (req,res)=>{
    const nom = req.query.nom;
    var condition = nom?{nom:{[Op.like] : `%${nom}%`}}:null;

    User.findAll({where:condition})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all tutorials."
            });
        });
};

exports.findAllEmail = (req,res)=>{
    const email = req.params.email;
    User.findAll({where :{email:email}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while removing all tutorials."
            }); 
        });
};

exports.findAllUsername = (req,res)=>{
    const username = req.params.username;
    User.findAll({where :{username:username}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all users."
            }); 
        });
};

exports.findOne = (req,res)=>{
    const id = req.params.id;

    User.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving this user."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    User.update(req.body,{where:{id:id}})
        .then(number=>{
            if(number==1){
                res.send({
                    message : "Utilisateur a été mis à jour"
                });
            }else{
                res.send({
                    message : "Mise à jour de l'utilisateur à echouer"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:"Erreur de mise à jour de l'utilisateur"
            });
        });
};

exports.delete = (req,res)=>{
    const id = req.params.id;

    User.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"Utilisateur supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression de l'utilisateur"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée de l'utilisateur avec id ="+id
            });
        });
};