const path = require('path')
const express = require('express')
const GenerateTutorialRouter = express.Router()
const { ADDRESS } = require('../config')

const fetch = require('node-fetch');

GenerateTutorialRouter
    .route('/:tutorial_id')
    .get((req, res, next) => {
        tutorialid = req.params.tutorial_id;

        let tutorial_url = ADDRESS + "/tutorials/" + tutorialid;

        let settings = { method: "Get" };

        fetch(tutorial_url, settings)
            .then(res => res.json())
            .then((tutorial_json) => {
                let steps_url = ADDRESS + "/steps/?tutorialid=" + tutorial_json.id;
                let script = ""
                fetch(steps_url, settings)
                    .then(res => res.json())
                    .then((steps_json) => {
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

                        res.send(script);
                    })
            })
    });
    
module.exports = GenerateTutorialRouter
    