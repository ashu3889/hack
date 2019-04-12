var express = require('express');
var app = express();
var csv= require('csvtojson');
var csvFilePath='./crude999.csv';
var KiteConnect = require("./connect.js");
var jsonArray;
var api_key = "vlu1o53tt1makdu3",
    secret = "t45f9mr9r3jvbkgyg423hf5il90399el";
var access_token = '';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
      

var options = {
            "api_key": api_key,
            "debug": false
        };

var expressWs = require('express-ws')(app);

//var port  = process.env.PORT || 3000;

        






app.post('/ashu', function (req, res) {

console.log(req.body);

   var kc = new KiteConnect(options);
   var access_token_const = '';

    if (!access_token) {
            kc.generateSession(req.body.token, secret)
                .then(function(response) {

                   
                    access_token_const = response.access_token;

                    console.log('acess token const' + access_token_const);
                   
                   
                    kc.setAccessToken(access_token_const);


                    res.send(access_token_const);
                                   

                })
                .catch(function(err) {
                   
                    console.log(err);

                })
        } else {
            alert('else');
            kc.setAccessToken(access_token);

    }
 //res.status(400).send("unable to save to database");

   /*res.status(200).send({
            access_token: access_token_const
          });*/

     
  
})



app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
      let data  = JSON.stringify(jsonArray);
      ws.send(data);
  });
});


csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  //  console.log(jsonObj);
    jsonArray = jsonObj;
    
})

//const jsonArray=await csv().fromFile(csvFilePath);

app.get('/' , function(req,res){
res.send(jsonArray);
});

var router = express.Router();
app.use('/api' , router);

router.get('/:date' , function(req, res){
  var empName = req.params.date;

});


app.listen(4000, function(){
  console.log('express app setup complete');
});