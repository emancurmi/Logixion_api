const TutorialsServices = {
    getAllTutorials(knex) {
        return knex.select('*').from('tbl_tours_tutorials')
    },

    getAllTutorialsbyUserId(knex, userid) {
        return knex.select('*').from('tbl_tours_tutorials').where('userid', userid)
    },

    getById(knex, id) {
        return knex.from('tbl_tours_tutorials').select('*').where('id', id).first()
    },

    insertTutorial(knex, newTutorial) {
        return knex
            .insert(newTutorial)
            .into('tbl_tours_tutorials')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteTutorial(knex, id) {
        return knex('tbl_tours_tutorials')
            .where({ id })
            .delete()
    },

    updateTutorial(knex, id, newTutorialFields) {
        return knex('tbl_tours_tutorials')
            .where({ id })
            .update(newTutorialFields)
    },
}

module.exports = TutorialsServices