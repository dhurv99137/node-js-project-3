const data_cheak = (req, res, next) => {
    let { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body

    if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || !veg) {
        res.status(400).send("All fields are required");
    }
    else {
        next()
    }
}
module.exports = data_cheak
