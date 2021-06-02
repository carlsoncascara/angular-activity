const express = require('express');
const router = express.Router();
const employee = require('../models/employee_db');

router.use(express.json());

router.get('/', (req,res) => {
    employee.getAllEmployee((result) => {
        if(!result){
            res.status(500);
            res.send("Database Error!");
        }else{
            res.status(200);
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    employee.getEmployee(id, (result)=>{
        if(!result){
            res.status(500);
            res.send("Database Error!");;
        }else{
            res.status(200);
            res.json(result);
        }
    });
});

router.post('/', (req, res) => {
    const response = employee.Employee(req.body);

    if(!response){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        employee.createEmployee(response,(result)=>{
            if(!result){
                res.status(500);
                res.send("Database Error!");
            }else{
                res.status(200);
                res.send("Ok");
            }
        });
    }

});

router.put('/:id', (req,res)=>{
    const { id } = req.params;
    const response = employee.Employee(req.body);

    if(!response){
        res.status(400);
        res.send("Invalid value(s) to update!")
    }else{
        employee.updateEmployee(id,response,(result)=>{
            if(!result){
                res.status(500);
                res.send("Database Error!");
            }else{
                res.status(200);
                res.send("Ok");
            }
        });
    }
});

router.delete("/:id",(req,res)=>{
    const { id } = req.params;
    if(id){
        employee.removeEmployee(id,(result)=>{
            if(!result){
                res.status(500);
                res.send("Database Error!");
            }else{
                res.status(200);
                res.send("Ok")
            }
        });
    }else{
        res.status(400);
        res.send("Invalid delete input!");
    }
});


module.exports = router;