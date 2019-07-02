const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { User, Department } = require('./database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cors')());
app.listen(port, ()=> console.log(`listening on port ${port}`));

app.get('/api/users', async (req, res, next) =>{
    try{
        res.send( await User.findAll() );
    }
    catch(err){
        next(err);
    }
});

app.get('/api/departments', async (req, res, next) =>{
    try{
        res.send( await Department.findAll() );
    }
    catch(err){
        next(err);
    }
});

app.put('/api/users/:id', async (req, res, next) =>{
    try{
        const individual = await User.findOne(
            {where: {id: req.params.id} } );

        individual.update({
            departmentId: req.body.departmentId
        });

        individual.save(); 

        res.send(individual);
    }
    catch(err){
        next(err);
    }
});

app.post('/api/users/', async (req, res, next) =>{
    try{

        const newPerson = await User.create(
            {name: req.body.name} );

        newPerson.save(); 

        res.send(newPerson);
    }
    catch(err){
        next(err);
    }
});

app.post('/api/departments/', async (req, res, next) =>{
    try{

        const newDepartment = await User.create(
            {name: req.body.name} );

        newDepartment.save(); 

        res.send(newDepartment);
    }
    catch(err){
        next(err);
    }
});

app.delete('/api/users/:id', async (req, res, next) =>{
    try{
        res.json( await User.destroy({
             where: {
                 id: req.params.id
                } 
            }));
    }
    catch(err){
        next(err);
    }
});

app.delete('/api/departments/:id', async (req, res, next) =>{
    try{
        res.json( await Department.destroy({
             where: {
                 id: req.params.id
                } 
            }));
    }
    catch(err){
        next(err);
    }
});


