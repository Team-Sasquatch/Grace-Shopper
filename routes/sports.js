const sportsRouter = require('express').Router();
const {createSport,getSportById,getAllSports,updateSport,destroySport} = require('../db/adapters/sports');

const {authRequired} = require('./authRoute');

sportsRouter.get('/',async(req,res,next)=>{
    try {
        const sports = await getAllSports();
        res.send({
            sports
        })
    } catch (error) {
        next(error);
    }
});

sportsRouter.post('/',authRequired,async(req,res,next)=>{
    try {
        const {name,description} = req.body;
        const sport = await createSport({name,description});
        //need to check if they are an admin
        res.send({
            sport
        });
    } catch (error) {
        next(error);
    }
})

sportsRouter.patch('/:sportId',authRequired,async(req,res,next)=>{
    try {
        const {sportId} = req.params;
        const {name,description} = req.body;
        const sport = await getSportById(sportId);
        // need to check if they are an admin
        const updatedSport = await updateSport(sportId,name,description);
        res.send({
            updatedSport
        })
    } catch (error) {
        next(error);
    }
})

sportsRouter.delete('/:sportId',authRequired,async(req,res,next)=>{
    try {
        const {sportId} = req.params;
        const sport = await getSportById(sportId);
        // need to check if they are an admin
        const deletedSport = await destroySport(sportId);
        res.send({
            deletedSport
        })
    } catch (error) {
        next(error);
    }
})

module.exports = sportsRouter;