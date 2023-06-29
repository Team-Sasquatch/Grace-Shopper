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

sportsRouter.get('/:sportId',async(req,res,next)=>{
    try {
        const {sportId} = req.params;
        const sport = await getSportById(sportId);
        res.send({
            sport
        })
    } catch (error) {
        next(error);
    }
})

sportsRouter.post('/',authRequired,async(req,res,next)=>{
    try {
        const {name,description} = req.body;
        if (req.user.is_admin){
            const sport = await createSport({name,description});
            res.send({
                sport
            });
        }
        else{
            next({
                name: 'UserNotAdminError',
                message: 'The user is not an admin and cannot perform this task'
            })
        }
    } catch (error) {
        next(error);
    }
})

sportsRouter.patch('/:sportId',authRequired,async(req,res,next)=>{
    try {
        const {sportId} = req.params;
        const {name,description} = req.body;
        if (req.user.is_admin){
            const updatedSport = await updateSport(sportId,name,description);
            res.send({
                updatedSport
            })
        }
        else{
            next({
                name: 'UserNotAdminError',
                message: 'The user is not an admin and cannot perform this task'
            })
        }
    } catch (error) {
        next(error);
    }
})

sportsRouter.delete('/:sportId',authRequired,async(req,res,next)=>{
    console.log(req.user)
    try {
        const {sportId} = req.params;
        if (req.user.is_admin){
            const deletedSport = await destroySport(sportId);
            res.send({
                deletedSport
            })
        }
        else{
            next({
                name: 'UserNotAdminError',
                message: 'The user is not an admin and cannot perform this task'
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = sportsRouter;