const db = require("../models");
const Detailcommande = db.detailcommande;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body.idpro && !req.body.idcommande && !req.body.nombre){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }

    //create detailcommande
    const detailcommande = {
        idpro : req.body.idpro,
        idcommande : req.body.idcommande,
        nombre : req.body.nombre
    }

    //Save detailcommande
    Detailcommande.create(detailcommande)
        .then(data=>{res.send(data)})
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the detail commande"
            });
        });
};

exports.findAll = (req,res)=>{
    const idpro = req.query.idpro;
    var condition = idpro?{idpro:{[Op.like] : `%${idpro}%`}}:null;

    Detailcommande.findAll({where:condition})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving detail commande."
            });
        });
};

exports.findAllDetailInCommande = (req,res)=>{
    const idcommande = req.params.idcommande;
    Detailcommande.findAll({where :{idcommande:idcommande}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all details of commandes."
            }); 
        });
};

exports.findAllCommandeContainProduit = (req,res)=>{
    const idpro = req.params.idpro;
    Detailcommande.findAll({where :{idpro:idpro}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all details."
            }); 
        });
};

exports.findOne = (req,res)=>{
    const id = req.params.id;

    Detailcommande.findByPk(id)
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

    Detailcommande.update(req.body,{where:{id:id}})
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

    Detailcommande.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"Detail supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression du detail"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée du detail avec id ="+id
            });
        });
};