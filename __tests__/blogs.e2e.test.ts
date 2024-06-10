import request from 'supertest'
import {app} from "../src";
import dotenv from 'dotenv'

dotenv.config()
import {BlogType} from "../src/types/blog/output";

// import {client} from "../src/db";
import {response} from "express";
import exp = require("constants");


const dbName = 'blogCollection'
const clientTest = client;

describe('/blogs', () => {
    let newBlog: BlogType | null = null

    beforeAll(async () => {
        await clientTest.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })

    afterAll(async () => {
        await clientTest.close()
    })

    it('GET blogs = []', async () => {
        await request(app)
            .get('/blogs/')
            .expect(200)
            .then(response => {
                expect(response.body.items).toEqual([])
                expect(response.body.totalCount).toEqual(0)

                console.log(response.body.items)
            })
    });

    it('Should not create blog because unauth', async () => {
        await request(app)
            .post('/blogs/')
            .auth('admin', 'qwert')
            .send({
                "name": "string",
                "description": "string",
                "websiteUrl": "https://I8yeiUym1_SU2ZButDFOH50rlAZY-J7D7ue3RDIuYbpqVzwI821rP28tyhsM5phRN1mqD5fC6BTf.AzvgZi56tYP93G2"
            })
            .expect(401)
    });

    it('Should not create blog because unauth', async () => {
        await request(app)
            .post('/blogs/')
            .auth('admin', 'qwerty')
            .send({
                "name": "",
                "description": "",
                "websiteUrl": ""
            })
            .expect(400,
                {
                    "errorsMessages": [
                        {
                            "message": "Incorrect name!",
                            "field": "name"
                        },
                        {
                            "message": "Incorrect description!",
                            "field": "description"
                        },
                        {
                            "message": "Invalid value",
                            "field": "websiteUrl"
                        }
                    ]
                })
    });

    let blog1;
    let blog2;

    it('Should create blog', async () => {
        await request(app)
            .post('/blogs/')
            .auth('admin', 'qwerty')
            .send({
                "name": "testname",
                "description": "test test",
                "websiteUrl": "https://3ad80d0f45fa0bbc25057d041e54f82e.serveo.net"
            })
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                    {
                        id: expect.any(String),
                        name: 'testname',
                        description: 'test test',
                        websiteUrl: 'https://3ad80d0f45fa0bbc25057d041e54f82e.serveo.net',
                        createdAt: expect.any(String),
                        isMembership: false

                    })

                blog1 = response.body;
            })
    });

    // get all blogs

    it('GET blogs =', async () => {
        await request(app)
            .get('/blogs/')
            .expect(200)
            .then(response => {
                expect(response.body.items).toEqual([blog1!])
            })
    });


    it('Should create blog', async () => {
        await request(app)
            .post('/blogs/')
            .auth('admin', 'qwerty')
            .send({
                "name": "testname1",
                "description": "test test",
                "websiteUrl": "https://3ad80d0f45fa0bbc25057d041e54f82e.serveo.net"
            })
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                    {
                        id: expect.any(String),
                        name: 'testname1',
                        description: 'test test',
                        websiteUrl: 'https://3ad80d0f45fa0bbc25057d041e54f82e.serveo.net',
                        createdAt: expect.any(String),
                        isMembership: false
                    })
                blog2 = response.body;
            })
    });


    it('GET blogs =', async () => {
        await request(app)
            .get('/blogs/')
            .expect(200)
            .then(response => {
                expect(response.body.items).toEqual([blog2!, blog1!])
            })
    });


    it('GET blog1 by id', async () => {
        await request(app)
            .get(`/blogs/${blog1!.id}`)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(blog1!)
            })
    });

    it('GET blog2 by id', async () => {
        await request(app)
            .get(`/blogs/${blog2!.id}`)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(blog2!)
            })
    });

    it('Should not get blog by wrong id', async () => {
        await request(app)
            .get(`/blogs/65aebd256640e4d9af9c7d9c`)
            .expect(404)
    });


    // put

    it('Should not update blog because not authorized', async () => {
        await request(app)
            .put(`/blogs/65aebd256640e4d9af9c7d9c`)
            .expect(401)
    });

    it('Should not update blog because not found', async () => {
        await request(app)
            .put(`/blogs/65aebd256640e4d9af9c7d9c`)
            .auth('admin', 'qwerty')
            .send({
                "name": "testname5",
                "description": "test test test",
                "websiteUrl": "https://3a680d0f45fa0bbc25057d041e54f82e.serveo.com"
            })
            .expect(404)
    });

    it('Should not update blog because req is not valid', async () => {
        await request(app)
            .put(`/blogs/${blog2!.id}`)
            .auth('admin', 'qwerty')
            .send({
                "name": "",
                "description": "",
                "websiteUrl": ""
            })
            .expect(400, {
                "errorsMessages": [
                    {
                        "message": "Incorrect name!",
                        "field": "name"
                    },
                    {
                        "message": "Incorrect description!",
                        "field": "description"
                    },
                    {
                        "message": "Invalid value",
                        "field": "websiteUrl"
                    }
                ]
            })
    });

    it('Should update blog', async () => {
        await request(app)
            .put(`/blogs/${blog2!.id}`)
            .auth('admin', 'qwerty')
            .send({
                "name": "updated name",
                "description": "updated desc",
                "websiteUrl": "https://3a680d0f45fa0bbc25057d041e54f82e.serveo.com"
            })
            .expect(204)
    });

    it('Should check update blog2', async () => {
        await request(app)
            .get(`/blogs/${blog2!.id}`)
            .auth('admin', 'qwerty')
            .expect(200)
            .then(response => {
                expect(response.body).not.toEqual(blog2!)
            })
    });


    it('Should not delete blog2', async () => {
        await request(app)
            .delete(`/blogs/65aebd256640e4d9af9c7d9c`)
            .auth('admin', 'qwerty')
            .expect(404)
    });

    it('Should not delete blog2', async () => {
        await request(app)
            .delete(`/blogs/65aebd256640e4d9af9c7d9c`)
            .auth('admi', 'qwerty')
            .expect(401)
    });

    it('Should check delete blog2', async () => {
        await request(app)
            .delete(`/blogs/${blog2!.id}`)
            .auth('admin', 'qwerty')
            .expect(204)
    });

    it('Should check update blog2', async () => {
        await request(app)
            .get(`/blogs/${blog2!.id}`)
            .auth('admin', 'qwerty')
            .expect(404)
    });

});


