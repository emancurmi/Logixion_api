const UsersServices = {
    getAllUsers(knex) {
        return knex.select('*').from('tbl_tour_users')
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('tbl_tour_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex.from('tbl_tour_users').select('*').where('id', id).first()
    },

    deleteUser(knex, id) {
        return knex('tbl_tour_users')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('noteful_folders')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersServices