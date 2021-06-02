const express = require('express');
const router = express.Router();
const skill = require('../models/skill_db');

router.use(express.json());

router.get('/',(req, res)=>{
    skill.getAllSkill((response)=>{
        if(!response){
            res.status(500);
            res.send("Database Error!");
        }else{
            res.status(200);
            res.json(response);
        }
    });
});

router.get('/:id',(req,res)=>{
    const { id } = req.params;
    skill.getSkill(id,(response)=>{
        if(!response){
            res.status(500);
            res.send("Database Error!");
        }else{
            res.status(200);
            res.json(response);
        }
    });
});

router.post('/',(req,res)=>{
    const result = skill.Skill(req.body);
    if(!result){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        skill.createSkill(result, response=>{
            if(!response){
                res.status(500);
                res.send("Databasae Error!");
            }else{
                res.status(200);
                res.send("Ok");
            }
        });
    }
});

router.put('/:id',(req,res)=>{
    const { id } = req.params;
    const result = skill.Skill(req.body);
    if(!result){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        skill.updateSkill(id, result, response=>{
            if(!response){
                res.status(500);
                res.send("Database Error!");
            }else{
                res.status(200);
                res.send("Ok");
            }
        });
    }
});

router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    if(id){
        skill.deleteSkill(id, response=>{
            if(!response){
                res.status(500);
                res.send("Database Error!");
            }else{
                res.status(200);
                res.send("Ok");
            }
        });
    }else{
        res.status(400);
        res.send("Invalid delete input!");
    }
});

module.exports = router;