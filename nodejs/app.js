const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS settings
const origin = "http://localhost:4200";
const optSuccessStatus = 200;
const corsOpt = {
    origin: "http://localhost:4200",
    optionSuccessStatus: 200,
}
// CORS
app.use(cors(corsOpt));

// Routes
app.use('/employee', require('./routes/employee-api'));
app.use('/skill',require('./routes/skill-api'));


app.listen(port, ()=>{
    console.log(`Server nodejs server at http://localhost:${port}`);
});