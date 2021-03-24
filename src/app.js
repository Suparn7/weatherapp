const express = require('express'); //express require kiya
const path = require('path'); // path dekhne k liye
const hbs = require('hbs');
const app = express(); // express ki saari property app se use krskte h
const port = process.env.PORT || 3000; //kahin se host karoge toh process wrna simply 3000 pe chla jayega

//public static path
const static_path = (path.join(__dirname, "../public"));
const template_path = (path.join(__dirname, "../templates/views"));//view ko template yukt krne k baad wala scene
const partials_path = (path.join(__dirname, "../templates/partials"));//partial register krne k baad wala scene


app.set('view engine', 'hbs'); //view engine use krrhe ho toh kaunsa krrhe ho, btao usko hbs krrhe
app.set('views', template_path);/* by default tha pahle views but ab template path k andar hai upar wahi btaya*/
hbs.registerPartials(partials_path);//partials use krrhe toh btado usko that registerkrlo bhaii

app.use(express.static(static_path));

app.get("", (req,res)=>{ //for homepage ""
    res.render('index') // res saamne ayega
})

app.get("/about", (req,res)=>{ //for homepage ""
    res.render('about') // res saamne ayega
})

app.get("/weather", (req,res)=>{ //for homepage ""
    res.render('weather') // res saamne ayega
})

app.get("*", (req,res)=>{ //for homepage ""
    res.render('404error',{// res saamne ayega
       errorMsg: 'Opps! Page Not Found'//use as aproperty
    }) 
})

app.listen(port, () =>{
    console.log(`listening to PORT at ${port}`) // `${} wagerah literals hain
})

//node src/app.js -e js,hbs if nodemon not installed