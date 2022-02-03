const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const User = require("../models/users")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUserList)
})

describe("invalid users are not added", () => {
    test("username is missing", async () => {

        const newUser = {
            name:"Telemann",
            password:"lalalalulululu"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            
    }, 150000)
})

afterAll( () => {
    mongoose.connection.close()
  })