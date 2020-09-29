require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')

console.log(process.env.DATABASE_URL);

global.expect = expect
global.supertest = supertest