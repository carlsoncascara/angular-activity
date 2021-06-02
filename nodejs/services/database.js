const db = require('mysql');

const conn = db.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'angular_activity_one'
});

conn.connect((err)=>{
    if(err) console.log(err);
});

module.exports = conn;