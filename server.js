const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.post(`/completions`, async (req,res)=>{
    const options = {
        method:"POST",
        headers:{
            "Authorization":`Bearer ${process.env.API_KEY}`,
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user", content: req.body.message }],
            max_tokens: 100,
        })
    }
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions",options);

      const data = await response.json();
      res.send(data);

    } catch (error) {
        console.error(error);
    }
})

app.listen(process.env.PORT,()=> console.log(`server is running on port ${process.env.PORT}`));