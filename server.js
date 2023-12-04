import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
const PORT = 4000;
const url = "https://adventofcode.com/2023/day/4/input"
app.use(cors())

app.get('/fetch-advent-data', async (req, res) => {
    try{
        const response = await fetch(url, {
            headers: {
                'Cookie': `session=${process.env.SESSION_COOKIE}`
            }
        });
        const data = await response.text();
        console.log("data sent")
        res.send(data)
    }catch(error){
        res.status(500).send(`An error occured fetching data. error:${error}`)
    }
});

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT)
})