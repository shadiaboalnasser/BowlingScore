const express = require('express');
const getScore = require("./functions");

const router = express.Router();

const routes = function () {
    router.route('/frames')
        .post((req, res) => {
            var request = getScore(req.body);
            var score = {score : request};
            res.json(score);
        });

    return router;
};

module.exports = routes();