const db = require("../models");
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body.libelle){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }

    //create categorie
    const categorie = {
        libelle : req.body.libelle,
        actif : 1
    }

    //Save categorie
    Categorie.create(categorie)
        .then(data=>{res.send(data)})
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the categorie"
            });
        });
};

exports.findAll = (req,res)=>{
    const libelle = req.query.libelle;
    var condition = libelle?{libelle:{[Op.like] : `%${libelle}%`}}:null;

    Categorie.findAll({where:condition})
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


exports.findOne = (req,res)=>{
    const id = req.params.id;

    Categorie.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving this categorie."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    Categorie.update(req.body,{where:{id:id}})
        .then(number=>{
            if(number==1){
                res.send({
                    message : "Categorie a été mis à jour"
                });
            }else{
                res.send({
                    message : "Mise à jour du categorie à echouer"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:"Erreur de mise à jour du categorie"
            });
        });
};

exports.delete = (req,res)=>{
    const id = req.params.id;

    Categorie.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"Categorie supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression de categorie"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée du categorie avec id ="+id
            });
        });
};