var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('', async function (req, res) {
    res.status(200);
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/bmi', async function (req, res) {
    var height_feet = parseInt(req.body.heightFeet);
    var height_inches = parseInt(req.body.heightInches);
    var height = (height_feet * 12) + height_inches;
    var weight = parseInt(req.body.weight);
    var bmi = (weight / (height * height)) * 703
    bmi = bmi.toFixed(1);
    res.send(`Your BMI is ${bmi}`);
});

app.post('/idealcalorie', async function (req, res) {
    var weight = parseInt(req.body.weight);
    var height_feet = parseInt(req.body.heightFeet);
    var height_inches = parseInt(req.body.heightInches);
    var weight_kg = weight / 2.2;
    var height_cm = (height_feet * 30.5) + (height_inches * 2.5);
    var gender = req.body.gender;
    var age = parseInt(req.body.age);
    var bmr = 0;
    if (gender === 'male') {
        bmr = 66.47 + (13.75 * weight_kg) + (5.003 * height_cm) - (6.755 * age);
    } else {
        bmr = 655.1 + (9.563 * weight_kg) + (1.85 * height_cm) - (4.676 * age);
    }
    var amr = 0;
    switch (req.body.activityLevel) {
        case "sedantary":
            amr = bmr * 1.2;
            break;
        case "light":
            amr = bmr * 1.375;
        case "moderate":
            amr = bmr * 1.55;
            break;
        case "active":
            amr = bmr * 1.725;
            break;
        case "extra":
            amr = bmr * 1.9;
            break;
        default:
            amr = 934.1;
    }
    amr = amr.toFixed(1);
    console.log("HERE");
    res.send(`Your Ideal Calorie intake is ${amr} calories per day`);
});

app.post('/idealfat', async function (req, res) {
    var weight = parseInt(req.body.weight);
    var height_feet = parseInt(req.body.heightFeet);
    var height_inches = parseInt(req.body.heightInches);
    var weight_kg = weight / 2.2;
    var height_cm = (height_feet * 30.5) + (height_inches * 2.5);
    var gender = req.body.gender;
    var age = parseInt(req.body.age);
    var bmr = 0;
    if (gender === 'male') {
        bmr = 66.47 + (13.75 * weight_kg) + (5.003 * height_cm) - (6.755 * age);
    } else {
        bmr = 655.1 + (9.563 * weight_kg) + (1.85 * height_cm) - (4.676 * age);
    }
    var amr = 0;
    switch (req.body.activityLevel) {
        case "sedantary":
            amr = bmr * 1.2;
            break;
        case "light":
            amr = bmr * 1.375;
        case "moderate":
            amr = bmr * 1.55;
            break;
        case "active":
            amr = bmr * 1.725;
            break;
        case "extra":
            amr = bmr * 1.9;
            break;
        default:
            amr = 934.1;
    }
    amr = amr.toFixed(1);
    var fat_intake = amr * 0.20;
    fat_intake = fat_intake.toFixed(2);
    res.send(`Your Ideal Fat intake is ${fat_intake} calories per day`);
});

app.post('/idealweight', async function (req, res) {
    var weight = parseInt(req.body.weight);
    var height_feet = parseInt(req.body.heightFeet);
    var height_inches = parseInt(req.body.heightInches);
    var height_cm = (height_feet * 30.5) + (height_inches * 2.5);
    var gender = req.body.gender;
    var ideal_weight = 0;
    if (gender == 'male') {
        ideal_weight = 50 + (0.91 * (height_cm - 152.4))
    } else {
        ideal_weight = 45.5 + (0.91 * (height_cm - 152.4));
    }
    ideal_weight = ideal_weight.toFixed(2);
    res.send(`Your Ideal Body Weight should be ${ideal_weight}`);
});

app.listen(3000, function () {
    console.log("App is listening at Port 3000");
})