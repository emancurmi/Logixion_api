const TutorialStepsServices = {
    deleteStepbyTutorialId(knex, id) {
        return knex('tbl_tours_steps')
            .delete()
            .where('tutorialid', { id })

    }
}

module.exports = TutorialStepsServices