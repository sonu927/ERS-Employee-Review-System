const express = require('express');
const app = express();
const PORT = 5000;


app.listen(PORT,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server running on port : ${PORT}`);
});