const path=require('path');
const express=require('express');
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
//just making some changes to explore the git
//express exposes only one function express we can call this function to start and getting things done
const app=express();//by calling this function we are creating the express application
//we can use this app variable to do all things we want to do with express application
//we use get function for routing like what will happen when the user will request for different different 
//urls it runs the corresponding request regarding the url
//localhost:3000 or  app.js
//the below way can be used to manipulate the path and get the desired address but
//the core module path provides greater information for cross os plateforms also

//define paths for express config
const publicdirectorypath=path.join(__dirname,'../public');
const viewsdirpath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000 ;
//now register partials 
hbs.registerPartials(partialspath);

//set up handelbar engine and views location
app.set('view engine' ,'hbs');
app.set('views',viewsdirpath);

//configuring the express to provide static resources
app.use(express.static(publicdirectorypath));

//mapping requests for the relative path
app.get('',(req,res)=>{
 res.render('index' ,{
     title:"weather app",
     name:"Eshu kumar"
 });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about",
        name:"Eshu kuamr"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        name:"Eshu kuamr",
        message:"Have a good day"
    })
})
//express will match all the path from top to bottom
//this is app.js/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide the address"
        })
    }
//code starting for weather api
const address=req.query.address;
geocode(address,(error,{latitude,longitude,location}={})=>{
    if(error){
      console.log(error)
      return res.send({
        error
    })
    }else{
      forecast(latitude,longitude,(error,forecastdata)=>{
       if(error){
         console.log(error)
         return res.send({
            error
        })
       }else{
        res.send({
            address:req.query.address,
            location,
            weatherinfo:forecastdata
        });
         console.log("weather information for location : "+location)
         console.log(forecastdata)
       }
     })
    }
   })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide the search field"
        })
        
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"error",
        name:"Eshu kuamr",
        error:"help article not found"
    })
})
//this is the last route if anything that does not match this function will run in the end 
//express match all from top to bottom
app.get('*',(req,res)=>{
    res.render('error',{
        title:"error",
        name:"Eshu kuamr",
        error:"seems like bad url"
    })
})

//this app.listen is run to start the web server to keep it up and running
//you can use the different available ports also to run it that are available
app.listen(port,()=>{
    console.log('web server has been started on port '+port)
})
