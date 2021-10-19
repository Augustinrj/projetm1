const db = require("../models");
const Commande = db.commande;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body.idpers){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }

    //create commande
    const commande = {
        idpers : req.body.idpers,
        actif : 0
    }

    //Save commande
    Commande.create(commande)
        .then(data=>{res.send(data)})
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the commande"
            });
        });
};

exports.findAll = (req,res)=>{
    const idpers = req.query.idpers;
    var condition = nom?{nom:{[Op.like] : `%${idpers}%`}}:null;

    Commande.findAll({where:condition})
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

exports.findBetween = (req,res)=>{
    //date ='2021-03-13';
    const date1 = Date.parse(req.params.date1);
    const date2 = Date.parse(req.params.date2);
    Commande.findAll({
        where :{
        updatedAt: {[Op.between]:[date1,date2]}
            }
        })
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving commande."
            }); 
        });
};

exports.findOne = (req,res)=>{
    const id = req.params.id;

    Commande.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving this commande."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    Commande.update(req.body,{where:{id:id}})
        .then(number=>{
            if(number==1){
                res.send({
                    message : "Commande a été mis à jour"
                });
            }else{
                res.send({
                    message : "Mise à jour de la commande à echouer"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:"Erreur de mise à jour de la commande"
            });
        });
};

exports.delete = (req,res)=>{
    const id = req.params.id;

    Commande.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"commande supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression de la commande"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée de la commande avec id ="+id
            });
        });
};