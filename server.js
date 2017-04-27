var express = require('express');
var url = require('url');
var app = express();

app.get('*', function (req, res) {
    
    //req info VAR
    var href = url.parse(req.url).href; //all GET
    //var pahtname = url.parse(req.url).pahtname; //only path
    //var query = url.parse(req.url).query; //only query
    var method = req.method;
    //if(href.toString().matches("^[A-Z]{2}\\d{4}"))
    var getDate;
    var myDiff;
    var natural = false;
    var final;
    if(href.replace('/','').match("^\\d") == true){//UNIX
        myDiff = href.toString().replace(/,/,'').replace('/','');
        getDate = new Date(parseInt(myDiff));
        //console.log(getDate);
        //getDate.setTime(Date.parse(myDiff).toISOString());
        final = new Date(getDate.getUTCFullYear()+'-'+(getDate.getUTCMonth()+1)+'-'+getDate.getUTCDate()).toString().split(' ');
        
    } 
    else /*if(href.replace('/','').match("/[A-Za-z]{3}/g") == true)*/{//NATURAL
        getDate = href.toString().replace(/,/,'').replace('/','').split('%20');
        natural = true;
        myDiff = new Date(getDate[2]+'-'+getDate[0]+'-'+getDate[1]) - new Date('1970-01-01');
        final = new Date(getDate[2]+'-'+getDate[0]+'-'+getDate[1]).toString().split(' ');
    }
    
    final = final[0] +' '+ final[1] +' '+ final[2] +', '+ final[3];
    //var myJson = JSON.stringify({'unix': myDiff, 'natural': final});
    var myJson = JSON.stringify({'unix': myDiff, 'natural': final});
    
    
  //res.send('Hello World!\n'+method+'\n'+href + '->'+final+'->'+myDiff +'->'+myJson);
  res.send(myJson);
  
})

app.listen(8080, function () {
  console.log('Example Server listening on port 8080!')
})
