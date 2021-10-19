const db = require("../models");
const Produit= db.produit;
const Photo= db.photo;
const Op = db.Sequelize.Op;

//create and save 
exports.create = (req,res)=>{

    // res.json({
    //     'message':'File uploaded successfully : '+req.files.file.path.substring(8,req.files.file.path.length),
    //     'file':req.files,
    // });
    
    //validate request 
    if(!req.body.nomprod && !req.body.id_vendeur && !req.body.id_cat && !req.body.prix){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }
    if(req.files){
        // const photo = {
        // url : req.files.file.path.substring(8,req.files.file.path.length),
        // actif : 1
        // }
        // Photo.create(photo)
        //     .then(data=>{
        //         this.photo_Url = data['id'];
        //         console.log("data id : "+ data['id']);
        //     })
        //     .catch(err =>{
        //         res.status(500).send({
        //             message:
        //                 err.message || "Some error occured while creating the Produit"
        //         });
        //     });
            //create Produit
    const produit = {
        nomprod : req.body.nomprod,
        id_vendeur : req.body.id_vendeur,
        id_cat : req.body.id_cat,
        prix : req.body.prix,
        actif : 1,
        ref : req.body.ref?req.body.ref:null,
        description : req.body.description?req.body.description:null,
        stock : req.body.stock?req.body.stock:0,
        photoUrl : req.files.file.path.substring(8,req.files.file.path.length)
    }

    //Save Produit
    Produit.create(produit)
        .then(data=>{res.send(data)})
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Produit"
            });
        });
    }
    
    
};

exports.findAll = (req,res)=>{
    const nomprod = req.query.nomprod;
    var condition = nomprod?{nomprod:{[Op.like] : `%${nomprod}%`}}:null;

    Produit.findAll({where:condition})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all products."
            });
        });
};

exports.findAllVendeur = (req,res)=>{
    const id_vendeur = req.params.id_vendeur;
    Produit.findAll({where :{id_vendeur:id_vendeur}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all products."
            }); 
        });
};

exports.findAllProduitInCategorie = (req,res)=>{
    const id_cat = req.params.id_cat;
    Produit.findAll({where :{id_cat:id_cat}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
           res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving all Produits."
            }); 
        });
};

exports.findOne = (req,res)=>{
    const id = req.params.id;

    Produit.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving this Produit."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    Produit.update(req.body,{where:{id:id}})
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

    Produit.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"Produit supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression du produitr"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée du produit avec id ="+id
            });
        });
};