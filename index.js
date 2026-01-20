import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

const gifList = [
    "https://media.tenor.com/PAaBQ6NZVOoAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/UJzCmI1F77cAAAAi/milk-and-mocha.gif",
    "https://media.tenor.com/nwzCM1XQIv0AAAAi/grimacing-silly.gif",
    "https://media.tenor.com/plfnFIeAbYIAAAAi/l%C3%AAu-l%C3%AAu.gif",
    "https://media.tenor.com/bpHKtJCDixAAAAAi/happy-cat.gif",
    "https://media1.tenor.com/m/9Nr32cJWZ8oAAAAC/catto.gif",
    "https://media.tenor.com/6h2iQRNiNukAAAAi/puglie-pug-puglie.gif",
    "https://media1.tenor.com/m/m16tpSB-eokAAAAC/puglie-pug-puglie.gif",
    "https://media.tenor.com/BAhOD-W-wucAAAAi/dog-doggo.gif"
]

app.get("/", async (req,res)=>{

    const choose = Math.floor(Math.random()*gifList.length)

    try {
         const result = await axios.get("https://v2.jokeapi.dev/joke/Any");

         console.log(result.data);

         res.render("index.ejs",{content: result.data, imageSource : gifList[choose]})
    } catch (error) {
        res.render("index.ejs",{content: "not found any joke"})
    }
   
})

app.get("/reload", async (req,res)=>{

    const choose = Math.floor(Math.random()*gifList.length)

    try {
         const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
    
         console.log(result.data);

         res.render("index.ejs",{content: result.data , imageSource : gifList[choose]})
    } catch (error) {
        res.render("index.ejs",{content: "not found any joke"})
    }
   
})

app.post("/word", async (req,res)=>{

    const choose = Math.floor(Math.random()*gifList.length)

    const word = req.body.Word;

    try {
         const result = await axios.get("https://v2.jokeapi.dev/joke/Any?contains="+word);

         console.log(result.data);

         res.render("index.ejs",{content : result.data , imageSource : gifList[choose]})
    } catch (error) {
        res.render("index.ejs",{content: "not found any joke"})
    }

})

app.listen(port, ()=>{
    console.log("Server is Running on port " + port)
})