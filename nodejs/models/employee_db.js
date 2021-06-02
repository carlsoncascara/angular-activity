const db = require('../services/database');

function Employee(employee){
    const {firstName,lastName,birthdate,skills} = employee;

    console.log(firstName,lastName,birthdate,skills);
    if(firstName && lastName && birthdate && skills){
        console.log("Entered!")        
        return [
            firstName,
            lastName,
            birthdate,
            skills,
        ];

    }
    return false;
}

function getAllEmployee(result){
    db.query("SELECT * FROM employee", (err,res,fields) =>{
        const data = res.map( (val, index) => {
            date = new Date(val.birthdate);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();

            return {
                [fields[0].orgName] : val.id,
                [fields[1].orgName] : val.first_name,
                [fields[2].orgName] : val.last_name,
                [fields[3].orgName] : year+"-"+month+"-"+day,
                [fields[4].orgName] : val.skills
            }
        } );
        if(err){
            result(null);
        }else{
            if(!data){
                result([]);
            }else{ 
                result(data);
            }
        }
    });
};

function getEmployee(id, result){
    db.query("SELECT * FROM employee WHERE id = " + id, (err,res,fields)=>{
        console.log(fields.map( (value,index) => value.orgName ));
        if(err){
            result(null);
        }else{
            if(!res){
                result([]);
            }else{ 
                date = new Date(res.birthdate);

                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();

                data = {
                    id : res.id,
                    firstName: res.first_name,
                    lastName: res.last_name,
                    birthdate: year+"-"+month+"-"+day,
                    skills: res.skills
                }
                result(data);
            }
        }
    });
}

function createEmployee(employee, result){
    db.query("INSERT INTO employee (first_name,last_name,birthdate,skills) VALUES (?,?,?,?)",[
        employee[0],employee[1],employee[2],employee[3],
    ],(err,res)=>{
        if(err){
            console.log(err);
            result(false);
        }else{
            console.log(res.insertId);
            result(true);
        }
    });
}

function updateEmployee(id, employee, result){
    db.query("UPDATE employee SET first_name=?,last_name=?,birthdate=?,skills=? WHERE id=?",[
        employee[0],employee[1],employee[2],employee[3],id
    ],(err,res)=>{
        if(err){
            console.log(err);
            result(false);
        }else{
            console.log(res);
            result(true);
        }
    });
}

function removeEmployee(id, result){
    db.query("DELETE FROM employee WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error(err);
            result(false);
        }else{
            console.log(res);
            result(true);
        }
    });
}

module.exports = {
    Employee,
    getAllEmployee,
    getEmployee,
    createEmployee,
    updateEmployee,
    removeEmployee,
};