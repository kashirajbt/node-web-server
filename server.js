const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

//custom middleware
app.use((req,res,next)=>{
    var time = new Date().toString()
    var log = `${time} ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server log',log+'\n',(error)=>{
        if(error){
            console.log('Unable to write to file')
        }
    })
    next()
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:"Home Page"
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About Page",
        
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to parse the request'
    })
})

app.listen(port)