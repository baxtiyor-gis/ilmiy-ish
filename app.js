const express = require("express");
const morgan = require("morgan");
const Calculate = require("./controller/calculate")
const app = express();


app.set("view engine", "ejs");
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static('public/assets/'))



app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname})
})

app.post("/", (req, res) => {
    try {
        const { latitude, longitude, masshtab } = req.body
        const Calc = new Calculate(latitude, longitude, masshtab)

        if (req.body.masshtab == parseInt(1))
            return res.json(Calc.hundred())

        if (req.body.masshtab == parseInt(2))
            return res.json(Calc.fifty())

        if (req.body.masshtab == parseInt(3))
            return res.json(Calc.tventyFive())

        if (req.body.masshtab == parseInt(4))
            return res.json(Calc.teen())

        if (req.body.masshtab == parseInt(5))
        console.log(Calc.five());
            return res.json(Calc.five())

    } catch (err) {
        res.json(err.message)
    }
})


app.use("*", (req, res) => {
    res.render("404")
})


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`http://localhost:${PORT} is running`))