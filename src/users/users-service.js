const UsersServices = {
    getAllUsers(knex) {
        return knex.select('*').from('tbl_tours_users')
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('tbl_tours_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex.from('tbl_tours_users').select('*').where('id', id).first()
    },

    deleteUser(knex, id) {
        return knex('tbl_tours_users')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('tbl_tours_users')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersServices