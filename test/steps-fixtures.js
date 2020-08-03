function makeStepsArray() {
    return [
        { "element": ".step-one", "placement": "bottom", "title": "1", "content": "1", "tutorialid": 31 },
        { "element": "step3", "placement": "top", "title": "step3", "content": "step3", "tutorialid": 29 },
        { "element": ".step-two", "placement": "bottom", "title": "2", "content": "2", "tutorialid": 31 },
        { "element": ".step-three", "placement": "bottom", "title": "3", "content": "3", "tutorialid": 31 },
        { "element": "6", "placement": "bottom", "title": "6", "content": "6", "tutorialid": 31 },
        { "element": ".step-five", "placement": "bottom", "title": "5", "content": "5", "tutorialid": 31 },
        { "element": ".step-four", "placement": "bottom", "title": "4", "content": "4", "tutorialid": 31 }
    ]
}

function resultsStepsArray() {
    return [
        { "id": 1, "element": ".step-one", "placement": "bottom", "title": "1", "content": "1", "tutorialid": 31 },
        { "id": 2, "element": "step3", "placement": "top", "title": "step3", "content": "step3", "tutorialid": 29 },
        { "id": 3, "element": ".step-two", "placement": "bottom", "title": "2", "content": "2", "tutorialid": 31 },
        { "id": 4, "element": ".step-three", "placement": "bottom", "title": "3", "content": "3", "tutorialid": 31 },
        { "id": 5, "element": "6", "placement": "bottom", "title": "6", "content": "6", "tutorialid": 31 },
        { "id": 6, "element": ".step-five", "placement": "bottom", "title": "5", "content": "5", "tutorialid": 31 },
        { "id": 7, "element": ".step-four", "placement": "bottom", "title": "4", "content": "4", "tutorialid": 31 }
    ]
}

module.exports = {
    makeStepsArray,
    resultsStepsArray
}