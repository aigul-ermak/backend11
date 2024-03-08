import request from 'supertest'
import {app} from "../src";
import dotenv from 'dotenv'
dotenv.config()

import {client} from "../src/db";
import {UserType} from "../src/types/user/output";

const dbName = 'userCollection'
const clientTest = client ;

describe('/users', () => {
    let newUser: UserType | null = null

    beforeAll(async () => {
        await clientTest.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })
    afterAll(async () => {
        await clientTest.close()
    })

    it('GET users = []', async () => {
        const res = await request(app).get('/users/');

        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual({
            items: [],
            page: 1,
            pageSize: 10,
            pagesCount: 0,
            totalCount: 0
        });
    });
});


