const db = require("../models");
const User = db.test;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body.nom){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }

    //create user
    const user = {
        nom : req.body.nom,
        email : req.body.email
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
    const nom = req.params.nom;
    var condition = nom?{nom:{[Op.like]:'%${nom}%'}}:null;

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