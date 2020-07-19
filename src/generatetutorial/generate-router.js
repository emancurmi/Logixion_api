const path = require('path');
const express = require('express');
const GenerateTutorialRouter = express.Router();
const { ADDRESS } = require('../config');

const Script = require('../general/script');

const fetch = require('node-fetch');

GenerateTutorialRouter
    .route('/:tutorial_id')
    .get((req, res, next) => {
        let tutorialid = req.params.tutorial_id;

        let tutorial_url = ADDRESS + "/api/tutorials/" + tutorialid;
        console.log(tutorial_url);
        let settings = { method: "Get" };

        fetch(tutorial_url, settings)
            .then(res => res.json())
            .then((tutorial_json) => {
                let steps_url = ADDRESS + "/api/steps/?tutorialid=" + tutorial_json.id;
                console.log(steps_url);

                let script = "";

                //head css
                script += Script.getjavascript();

                script += Script.getcssscript();

                fetch(steps_url, settings)
                    .then(res => res.json())
                    .then((steps_json) => {
                        script += "<script>";
                        script += "function " + tutorial_json.name + "() {";
                        script += "var tour = new Tour({ storage: false });";
                        script += "tour.addSteps([";
                        for (let i = 0; i < steps_json.length; i++) {
                            script += "{";
                            script += "element:" + '"' + steps_json[i].element + '",';
                            script += "placement:" + '"' + steps_json[i].placement + '",';
                            script += "title:" + '"' + steps_json[i].title + '",';
                            script += "content:" + '"' + steps_json[i].content + '"';
                            script += "},";
                        }
                        script += "]);";
                        script += "tour.init();";
                        script += "tour.start()";
                        script += "}";
                        script += "</script>";

                        res.send(script);
                    })
            })
    });
    
module.exports = GenerateTutorialRouter
    