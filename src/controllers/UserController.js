const {validationResult, matchData} = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

module.exports = {
    getStates: async(req, res) =>{
        let states = await State.find();
        res.json({ states });
    },
    info: async(req, res) => {
        let token = req.query.token;
        //let { token } = req.query;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ iduser: user._id.toString() });
        let adList = [];
        for (let item in ads){
            const cat = await Category.findById(ads[item].category);
            adList.push({
                id: ads[item]._id,
                status:ads[item].status,
                images: ads[item].images,
                dateCreated: ads[item].dateCreated,
                title: ads[item].title,
                price: ads[item].price,
                priceNegociable: ads[item].priceNegociable,
                description: ads[item].description,
                views: ads[item].views,
                category: cat.slug
            });
        }
    }
}