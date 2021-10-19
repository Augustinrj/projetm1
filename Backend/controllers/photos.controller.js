const db = require("../models");
const Photo = db.photo;
const Op = db.Sequelize.Op;
var path = require('path');

//create and save 
// const multer = require ("multer");
// const storage = multer.diskStorage(
//         destination = function(req,file,callback){
//             callback(null,'./uploads');
//         },
//         filename=(req,file,callback)=>{
//             callback(null,file.originalname)
//         }
// );
exports.create = (req,res)=>{
    //validate request 
    // res.sendStatus(String(req.body.lien));
    // res.send(String(req.body.lien));
//    if(req)res.send(req.length());
    if(!req.body.lien){
        res.status(400).send({
            message : "Content can not be empty"
        });
        return;
    }
    //res.send(req.file.filename);
    //create photo
    const photo = {
        url : req.body.lien,
        actif : 1
    }

    
    
    // const upload = multer({
    //     storage : storage
    // }).single(req.file);


    // upload(req,res,err=>{
    //     if(err)res.send("Error");
    //     res.send("uploaded")
    // });
    //res.send("vide "+req.lien);
    //if(upload.err)res.send("Error");
    //Save photo
    Photo.create(photo)
        .then(data=>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the photo"
            });
        });
};

exports.findAll = (req,res)=>{
    let url = "";
    if(req.query.url!==""){
        url = req.query.url;
    
    Photo.findAll({where :{url:url}})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all photos."
            });
        });
    }
    else{
        Photo.findAll()
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all photos."
            });
        });
    }
};


exports.findOne = (req,res)=>{
    const id = req.params.id;

    Photo.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving this photo."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    Photo.update(req.body,{where:{id:id}})
        .then(number=>{
            if(number==1){
                res.send({
                    message : "Photo a été mis à jour"
                });
            }else{
                res.send({
                    message : "Mise à jour du photo à echouer"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:"Erreur de mise à jour du photo"
            });
        });
};

exports.delete = (req,res)=>{
    const id = req.params.id;

    Photo.destroy({
        where : {id:id}
    })
        .then(number=>{
            if(number==1){
                res.send({
                    message:"Photo supprimé avec succes"
                });
            }else{
                res.send({
                    message : "Erreur de suppression de photo"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : " Erreur : "+ err +"suppression echouée du photo avec id ="+id
            });
        });
};

// exports.findAllUrl = (req,res) => {
//     const url = req.params.url;
//     if (req.params.url !== null) {
//         const url = req.params.url;
//         var options = {
//             root: path.join(__dirname)
//         }
//         Photo.findAll().then(data => {
//             for (let index = 0; index < data.length; index++) {
//                 const element = data[index];
//                 if (url === element['url']) { 
//                     // res.send("ok recu");
//                     //res.set('Content-Type','image/png');
//                     res.sendFile("../uploads/5PJRFQj1fCmMlZNfzf2XSFAp.png");
//                 }
//                 //else res.send(" Fichier n'existe pas");
//             }
//         })
//         .catch(err => {res.send(err)});
//     }
// }