const db = require('../services/database');
function Skill(skill){
    const { name } = skill;

    if(name){
        return name;
    }
    return false;
}

function getAllSkill(response){
    db.query("SELECT * FROM skill", (err,res,field)=>{
        if(err){
            console.error(err);
            response(null);
        }else{
            response(res);
        }
    });
}

function getSkill(id, response){
    db.query("SELECT * FROM skill WHERE id=?",[id],(err,res,field)=>{
        if(err){
            console.error(err);
        }else{
            response(res);
        }
    });
}

function createSkill(skill, response){
    db.query("INSERT INTO skill (name) VALUES (?)",[skill],(err,res)=>{
        if(err){
            console.error(err);
            response(false);
        }else{
            console.log(res.insertId);
            response(true);
        }
    });
}

function updateSkill(id,skill,response){
    db.query("UPDATE skill SET name=? WHERE id=?",[skill,id],(err,res)=>{
        if(err){
            console.error(err);
            response(false);
        }else{
            response(true);
        }
    });
}

function deleteSkill(id, response){
    db.query("DELETE FROM skill WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error(err);
            response(false);
        }else{
            response(true);
        }
    });
}

module.exports = {
    Skill,
    getAllSkill,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
}