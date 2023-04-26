const mongoose = require('mongoose');
const {validationResult, matchData} = require('express-validator');
const Category = require('../models/Category');


module.exports = {
  getCategories: async (req, res) => {
    const cats = await Category.find();

    const categories = [];

    for(let category of cats){
      categories.push({
        name: category.name,
        slug: category.slug,
      });
    };

    res.json({categories});
  },
  setCatagory: async (req,res) => {

  }
};
