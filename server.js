var port = process.env.PORT || 5000 || 8080;//FOR HEROKU port Asignation
var express = require('express');
var url = require('url');
var app = express();
var root = '/home/ubuntu/workspace/timestamp';

//app.set('view engine','html');
//app.set('views','./views');
app.get('/', function(req, res){
    res.sendFile(root + '/views/index.html');
});

app.get('*', function (req, res) {
    
    //req info VAR
    var href = url.parse(req.url).href; //all GET
    //var pahtname = url.parse(req.url).pahtname; //only path
    //var query = url.parse(req.url).query; //only query
    var method = req.method;
    //if(href.toString().matches("^[A-Z]{2}\\d{4}"))
    var getDate;
    var myDiff;
    var value = false;
    var final;
    
    console.log('NATURAL_PARAMETER-> ' + /[a-zA-Z][%20]\d[%20,]\d/.test(href.replace('/','')));
    console.log('UNIX_PARAMETER-> ' + /[^a-zA-Z%,_]{12}/.test(href.replace('/','')));
    
    //UNIX
    if(/[^a-zA-Z%,_]{12}/.test(href.replace('/','')) == true && method == 'GET'){
    //if(href.replace('/','').match("^\\d") == true){
        console.log('UNIX_PROCESS...');
        myDiff = href.toString().replace('/','');
        getDate = new Date(parseInt(myDiff));
        value = true;
        //console.log(getDate);
        //getDate.setTime(Date.parse(myDiff).toISOString());
        final = new Date(getDate.getUTCFullYear()+'-'+(getDate.getUTCMonth()+1)+'-'+getDate.getUTCDate()).toString().split(' ');
        
    } //[%20]{3}(\d+)[%20]{3}(\d+)
    //NATURAL
    else if(/[a-zA-Z][%20]\d[%20,]\d/.test(href.replace('/','')) == true && method == 'GET'){
    //if(href.replace('/','').match(/([A-Za-z]+)/) == true){
        console.log('NATURAL_PROCESS...');
        getDate = href.toString().replace('/','').replace(/,/,'').split('%20');
        value = true;
        myDiff = new Date(getDate[2]+'-'+getDate[0]+'-'+getDate[1]) - new Date('1970-01-01');
        final = new Date(getDate[2]+'-'+getDate[0]+'-'+getDate[1]).toString().split(' ');
    } else{
        //NOT A NATURAL OR UNIX PARAMETER
        console.log('NULL_PROCESS...');
        myDiff = null;
        final = null;
    }
    
    var myJson;
    
    if(value == false){
        myJson = JSON.stringify({'unix': myDiff, 'natural': final});    
    }else{
        final = final[0] +' '+ final[1] +' '+ final[2] +', '+ final[3];
        myJson = JSON.stringify({'unix': parseInt(myDiff), 'natural': final});
        //var myJson = JSON.stringify({'unix': myDiff, 'natural': final});
    }
   
  //res.send('Hello World!\n'+method+'\n'+href + '->'+final+'->'+myDiff);
  res.send(myJson);
  
});


app.listen(port, function () {
  console.log('TimeStamp Api Server listening on port '+port+'!');
});



