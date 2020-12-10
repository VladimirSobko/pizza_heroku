const mongoose = require('mongoose');
const Pizza = require('./model/pizza');
require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

async function createPizzaSeed() {
  const pizzaCheese = await new Pizza(
      {
        name: "Cheese",
        priceUSD: "3.25",
        priceEUR: "2.72",
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/c2da53ec-00e2-4446-a4e6-74b83ed0b357.jpg',
        description: "Cheese, tomato",
        _id: 1,
      });

      const pizzaBarbeque = await new Pizza(
      {
        name: "Barbeque",
        priceUSD: 5.00,
        priceEUR: 4.18,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/baf084f4-fc94-443c-a646-fdeff9f301a6.jpg',
        description: "Cheese, chicken, tomato, papric",
        _id: 2,
      });

      const pizzaDoublePepperoni = await new Pizza(
      {
        name: "Double-pepperoni",
        priceUSD: 3.00,
        priceEUR: 2.51,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/4df905b0-0a43-4e95-a096-8e470918a267.jpg',
        description: "Cheese, chicken, tomato, papric",
       _id: 3,
      });

      const pizzaHawaiian = await new Pizza(
      {
        name: "Hawaiian",
        priceUSD: 3.75,
        priceEUR: 3.13,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b952eb17-77b8-4a14-b982-42fbf5ceaf0e.jpg',
        description: "Cheese, chicken, pine-apple",
        _id: 4,
      });

      const pizzaMargherita = await new Pizza(
      {
        name: "Margherita",
        priceUSD: 3.00,
        priceEUR: 2.51,
        img: 'https://cdn.dodostatic.net/static/Img/Products/21379561a76646f1945f1bc759c749b5_292x292.jpeg',
        description: "Cheese, tomato",
        _id: 5,
      });

      const pizzaMeatFest = await new Pizza(
      {
        name: "Meat-fest",
        priceUSD: 3.50,
        priceEUR: 2.92,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b61cca95-caa6-4952-94b2-6896098b4f53.jpg',
        description: "Cheese, chicken, meat, tomato, papric",
        _id: 6,
      });

      const pizzaMexican = await new Pizza(
      {
        name: "Mexican",
        priceUSD: 3.00,
        priceEUR: 2.51,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/ecd9d5b3-0cfc-4138-9559-18d9631fe8aa.jpg',
        description: "Cheese, chicken, papric, onion",
        _id: 7,
      });

      const pizzaItalian = await new Pizza(
      {
        name: "Italian",
        priceUSD: 3.00,
        priceEUR: 2.51,
        img: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/ac08a6eb-a136-4e76-83bc-bdd5253ff123.jpg',
        description: "Tomato, papric, pine-apple,onion",
        _id: 8,
      });

    await pizzaCheese.save();
    await pizzaBarbeque.save();
    await pizzaDoublePepperoni.save();
    await pizzaHawaiian.save();
    await pizzaMargherita.save();
    await pizzaMeatFest.save();
    await pizzaMexican.save();
    await pizzaItalian.save();
};

createPizzaSeed();



