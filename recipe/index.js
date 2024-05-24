const express = require("express");
const datacheak = require("./Middleware");
const app = express()

app.use(express.json());


let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]


app.get("/", (req, res) => {
    res.send("Welcome to the Recipe API.")
})

app.get("/recipe/all", (req, res) => {
    res.send(initialRecipe)
})

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/add", (req, res) => {
    res.sendFile(__dirname + "/recipe.html")
})

app.post("/recipe/add", datacheak, (req, res) => {
    const newRecipe = {
        name: req.body.name,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        imageUrl: req.body.imageUrl,
        country: req.body.country,
        veg: req.body.veg === 'on',
        id: initialRecipe.length + 1
    };
    initialRecipe.push(newRecipe);
    res.send(initialRecipe);
})

app.patch("/recipe/update/:id", (req, res) => {
    let { id } = req.params
    initialRecipe[id] = { ...initialRecipe[id], ...req.body }

    res.send(initialRecipe[id]);
})

app.delete("/recipe/delete/:id", (req, res) => {
    let { id } = req.params
    initialRecipe.splice(id, 1)

    res.send(initialRecipe)
})

app.get("/recipe/filter", (req, res) => {
    let { veg, sort, country } = req.query;

    let filteredRecipes = initialRecipe;

    if (veg !== undefined) {
        const isVeg = veg === 'true';
        filteredRecipes = filteredRecipes.filter(recipe => recipe.veg === isVeg);
    }

    if (country) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.country === country);
    }

 
    if (sort) {
        if (sort === 'lth') {
            filteredRecipes.sort((a, b) => a.preparationTime.localeCompare(b.preparationTime));
        } else if (sort === 'htl') {
            filteredRecipes.sort((a, b) => b.preparationTime.localeCompare(a.preparationTime));
        }
    }

    res.send(filteredRecipes);
});

app.listen(8090, () => {
    console.log("server is running up to 8090");
})