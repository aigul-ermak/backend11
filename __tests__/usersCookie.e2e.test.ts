import request from 'supertest'
import {app} from "../src";
import dotenv from 'dotenv'
dotenv.config()

import {client} from "../src/db";
import {UserType} from "../src/types/user/output";

const dbName = 'userCollection'
const clientTest = client ;

describe('/login', () => {
    let newUser: UserType | null = null

    beforeAll(async () => {
        await clientTest.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })
    afterAll(async () => {
        await clientTest.close()
    })

    it('Get users = []')

});

