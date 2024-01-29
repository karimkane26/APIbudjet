const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
mongoose.connect('mongodb+srv://karim:passer123@cluster0.xa7ibza.mongodb.net/?retryWrites=true&w=majority')
const port = 3000
const DepenseSchema = new mongoose.Schema({
    titre: String,
    montant: Number ,
})

const DepenseModel = mongoose.model('depenses',DepenseSchema)


// app.get('/getusers',(req,res)=>{
//     DepenseModel.find({}).then(function(APi){
//         res.json(APi)
//     }).catch(function(err){
//         console.log(err)
//     })
//     }
// )
// Affichage des donnés  Depense
app.get('/', async (req, res) => {
  const depenses = await DepenseModel.find()
  console.log("depenses ", depenses)
  res.status(200).json(depenses)
  });
// Affichage des données avec id
app.get("/:id",function(req,res){
  // fetchid = req.params.id;
  // DepenseModel.find(({id:fetchid}),function(err,val){
  //   res.send(val)
  // })
  DepenseModel.findOne({_id: req.params.id })
      .then(data => res.status(200).json(data))
      .catch(error => res.status(404).json({ error }));
  
})

// Creation des données 
  app.post("/post", (req,res) => {
    // Création d'une nouvelle instance de modèle avec les données de la requête
    const data = new DepenseModel({
      titre: req.body.titre,
      montant: req.body.montant,
    })
  
    // Sauvegarde de la nouvelle dépense dans la base de données
    data.save()
      .then(() => res.status(201).json({ message : 'Objet enregistré !' }))
      .catch(error => {
        console.error(error)
        res.status(400).json({"data":depenses})
      })
  })
app.put("/update/:id",(req,res)=>{
  DepenseModel.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
    .then(()=>res.status(200).json({message :'objet modifié '}))
    .catch(error => res.status(400).json({error}));
})

app.delete("/delete/:id",(req,res)=>{
  DepenseModel.deleteOne({_id: req.params.id})
    .then(()=>res.status(200).json({message: 'Objet Supprimé '}))
    .catch(error => res.status(400).json({error}))
})
// ----------------------------------------------------
const revenuSchema = new mongoose.Schema({
  titre: String,
  montant: Number ,
})
const RevenuModel = mongoose.model('revenus',revenuSchema)
// Post revenu
console.log("Revenu ", RevenuModel)

// Creation des données 
// Affichage des revenu 
app.get('/api/revenu', async (req, res) => {
  const Revenu = await RevenuModel.find()
  console.log("Revenu ", Revenu)
  res.status(200).json(Revenu)
  });
  app.get("/api/revenu/:id",function(req,res){
    RevenuModel.findOne({_id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(404).json({ error }));
    
  })
app.post("/postRevenu", (req,res) => {
  // Création d'une nouvelle instance de modèle avec les données de la requête
  const data = new RevenuModel({
    titre: req.body.titre,
    montant: req.body.montant,
  })

  // Sauvegarde de la nouvelle dépense dans la base de données
  data.save()
    .then(() => res.status(201).json({ message : 'Objet enregistré !' }))
    .catch(error => {
      console.error(error)
      res.status(400).json({"data":Revenu})
    })
})

app.put("/api/update/:id",(req,res)=>{
  RevenuModel.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
    .then(()=>res.status(200).json({message :'objet modifié '}))
    .catch(error => res.status(400).json({error}));
})

app.delete("/api/delete/:id",(req,res)=>{
  RevenuModel.deleteOne({_id: req.params.id})
    .then(()=>res.status(200).json({message: 'Objet Supprimé '}))
    .catch(error => res.status(400).json({error}))
})

  app.listen(port,(req,res)=>{
    console.log('running');
  })

  

