import request from 'supertest'
import mongoose from 'mongoose'
import {app} from "../src/app";
import dotenv from 'dotenv'

dotenv.config()
import {BlogDBType} from "../src/types/blog/output";

describe('Mongoose integration', () => {
    //const mongoURI = 'mongodb://0.0.0.0:27017/home_works'
    const mongoURI = 'mongodb+srv://aigulermak:drDgghecmurZEzXL@cluster0.uhmxqxv.mongodb.net';
    let newBlog: BlogDBType | null = null;
    let blog1: any;
    let post1: any;

    beforeAll(async () => {
        console.log("start connect")
        await mongoose.connect(mongoURI)
        await request(app).delete('/testing/all-data').expect(204);
        console.log("finish connect")
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    // get all posts - empty
    describe('GET all posts', () => {

        it('GET all posts blogs', async () => {
            const res_ = await request(app)
                .get('/posts')
                .expect(200)

            expect(res_.body.items.length).toBe(0)
        });

        // create blog first for create post

        it('POST blog: create blog ', async () => {
            const res_ = await request(app)
                .post('/blogs')
                .auth('admin', 'qwerty')
                .send({
                        'name': 'blog 1',
                        'description': 'blog description 1',
                        'websiteUrl': 'https://blog.com'
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                name: 'blog 1',
                description: 'blog description 1',
                websiteUrl: 'https://blog.com',
                createdAt: expect.any(String),
                isMembership: false
            });
            blog1 = res_.body;
        })

        // create post 201

        it('POST post: create post', async () => {
            const res_ = await request(app)
                .post('/posts')
                .auth('admin', 'qwerty')
                .send({
                        'title': 'post 1',
                        'shortDescription': 'description 1',
                        'content': 'content 1',
                        'blogId': blog1.id
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                title: 'post 1',
                shortDescription: 'description 1',
                content: 'content 1',
                blogId: blog1.id,
                blogName: blog1.name,
                createdAt: expect.any(String),
            });

            post1 = res_.body;
        });

        // create post 400
        it('POST post: create post: incorrect values', async () => {
            const res_ = await request(app)
                .post('/posts')
                .auth('admin', 'qwerty')
                .send({
                        'title': '',
                        'shortDescription': '',
                        'content': '',
                        'blogId': ''
                    }
                )
                .expect(400, {
                    "errorsMessages": [
                        {
                            "message": "Incorrect short description",
                            "field": "shortDescription"
                        },
                        {
                            "message": "Incorrect title",
                            "field": "title"
                        },
                        {
                            "message": "Incorrect content",
                            "field": "content"
                        },
                        {
                            "message": "Invalid value",
                            "field": "blogId"
                        },
                        {
                            "message": "Incorrect mongoid blogid",
                            "field": "blogId"
                        },
                        {
                            "message": "Incorrect blogId",
                            "field": "blogId"
                        }

                    ]
                });
        });

        // create post 401
        it('POST post: create post: unauthorized', async () => {
            const res_ = await request(app)
                .post('/posts')
                .auth('admin', 'qwert')
                .send({
                        'title': 'post 1.1',
                        'shortDescription': 'description 1',
                        'content': 'content 1',
                        'blogId': blog1.id
                    }
                )
                .expect(401)
        });

        // get all posts
        it('GET all posts with new post 1', async () => {
            const res_ = await request(app)
                .get('/posts')
                .expect(200)

            expect(res_.body.items).toEqual([post1!])
        });

         console.log(post1)

        it('GET post by id', async () => {
            const res_ = await request(app)
                .get(`/posts/${post1.id}`)
                .expect(200)
        });

    })
})

