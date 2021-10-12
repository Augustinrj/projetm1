module.exports = app=>{
    const test = require("../controllers/test.controller.js");
    const user = require("../controllers/users.controller.js");
    const categorie = require("../controllers/categories.controller.js");
    const commande = require("../controllers/commandes.controller.js");
    const detailcommande = require("../controllers/detailcommandes.controller.js");
    const photo = require("../controllers/photos.controller.js");
    const produit = require("../controllers/produits.controller.js");
    

    // const multer = require ("multer");
    // const storage = multer.diskStorage(
    //     destination = (req,file,callback)=>{
    //         callback(null,'../uploads/')
    //     },
    //     filename=(req,file,callback)=>{
    //         callback(null,`nom${file.originalname}`)
    //     }
    // );
    // const upload = multer({
    //     storage : storage
    // });


    const multipart = require('connect-multiparty');
    const multipartMiddleware = multipart({uploadDir : './uploads',filename:function(filename,callback){
        callback(filename+filename.originalname);
    }});
    

    var router = require("express").Router();
    /*
    *Route for test*/
    
    router.post("/test",user.create);
    router.get("/test",user.findAll);
    router.get("/test/email/:email",user.findAllEmail);
    /*End route*/

    /*
    *Route for users*/

    router.post("/",user.create);
    router.get("/",user.findAll);
    router.get("/?nom=:nom",user.findAll);
    router.get("/email/:email",user.findAllEmail);
    router.get("/find/:id",user.findOne);
    router.put("/update/:id",user.update);
    router.delete('/delete/:id',user.delete);
    /*End route for users*/ 
    /*
    *Route for categories*/

    router.post("/categorie/",categorie.create);
    router.get("/categorie/",categorie.findAll);
    router.get("/categorie/?libelle=:libelle",categorie.findAll);
    router.get("/categorie/find/:id",categorie.findOne);
    router.put("/categorie/update/:id",categorie.update);
    router.delete("/categorie/delete/:id",categorie.delete);
    /*End route for categories*/
    /*
    *Route for commandes*/

    router.post("/commande/",commande.create);
    router.get("/commande/",commande.findAll);
    router.get("/commande/?date1=:date1&date2=:date2",commande.findBetween);
    router.get("/commande/find/:id",commande.findOne);
    router.put("/commande/update/:id",commande.update);
    router.delete("/commande/delete/:id",commande.delete);
    /*End route for commandes*/
    /*
    *Route for detailcommande*/

    router.post("/detail/",detailcommande.create);
    router.get("/detail/",detailcommande.findAll);
    router.get("/detail/?idpro=:idpro",detailcommande.findAll);
    router.get("/detail/:idcommande",detailcommande.findAllDetailInCommande);
    router.get("/containpro/:idpro",detailcommande.findAllCommandeContainProduit);
    router.get("/detail/find/:id",detailcommande.findOne);
    router.put("/detail/update/:id",detailcommande.update);
    router.delete("/detail/delete/:id",detailcommande.delete);
    /*End route for detailcommande*/
    /*
    *Route for photos*/

    //router.post("/photo/",multipartMiddleware,(req,res)=>{});//photo.create
    router.post("/photos/",multipartMiddleware,(req,res)=>{
        res.json({
        'message':'File uploaded successfully : '+req.files.file.path.substring(8,req.files.file.path.length),
        'file':req.files,
    });
    });//photo.create
    // router.get("/photo/",photo.findAll);
    // router.get("/photo/?url=:url",photo.findAll);
    // router.get("/photo/find/:id",photo.findOne);
    // router.put("/photo/update/:id",photo.update);
    // router.delete("/photo/delete/:id",photo.delete);
    //router.get("/photo/file/:url", photo.findAllUrl);
    /*End route for photos*/
    /*
    *Route for produits*/

    router.post("/produit/",multipartMiddleware,produit.create);
    router.get("/produit/",produit.findAll);
    router.get("/produit/?nomprod=:nomprod",produit.findAll);
    router.get("/produit/vendeur/:id_vendeur",produit.findAllVendeur);
    router.get("/produit/cat/:id_cat",produit.findAllProduitInCategorie);
    router.get("/produit/find/:id",produit.findOne);
    router.put("/produit/update/:id",produit.update);
    router.delete("/produit/delete/:id",produit.delete);
    /*End route for produits*/

    app.use('/api/user',router);
};