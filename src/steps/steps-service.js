const StepsServices = {
    getAllSteps(knex) {
        return knex.select('*').from('tbl_tours_steps')
    },

    getAllStepsbyTutorialId(knex, tutorialid) {
        return knex.select('*').from('tbl_tours_steps').where('tutorialid', tutorialid)
    },

    getById(knex, id) {
        return knex.from('tbl_tours_steps').select('*').where('id', id).first()
    },

    insertStep(knex, newStep) {
        return knex
            .insert(newStep)
            .into('tbl_tours_steps')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteStep(knex, id) {
        return knex('tbl_tours_steps')
            .where({ id })
            .delete()
    },

    updateStep(knex, id, newStepFields) {
        return knex('tbl_tours_steps')
            .where({ id })
            .update(newStepFields)
    },
}

module.exports = StepsServices