import request from 'supertest'
import mongoose from 'mongoose'
import {app} from "../src/app";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import {settings} from "../src/services/settings";

dotenv.config();

let blog1;
let post1;
let user1;
let user2;
let comment1;

describe('Mongoose integration', () => {
    //const mongoURI = 'mongodb://0.0.0.0:27017/home_works'
    const mongoURI = 'mongodb+srv://aigulermak:drDgghecmurZEzXL@cluster0.uhmxqxv.mongodb.net';

    beforeAll(async () => {
        console.log("start connect")
        await mongoose.connect(mongoURI)
        await request(app).delete('/testing/all-data').expect(204);
        console.log("finish connect")
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    describe('GET comments', () => {

        //create blog
        it('POST blog: create blog ', async () => {
            const res_ = await request(app)
                .post('/blogs')
                .auth('admin', 'qwerty')
                .send({
                        "name": "test name 1",
                        "description": "test description 1",
                        "websiteUrl": "https://LimBr082_uipzjm8dF.HNo-1AvOJGJUGKwWlPwd7mE55JcWy2wq_puT2fVSI3cUsTao-xl.iGpAAlxdAe3LguxpFjc5v"
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                name: 'test name 1',
                description: 'test description 1',
                websiteUrl: 'https://LimBr082_uipzjm8dF.HNo-1AvOJGJUGKwWlPwd7mE55JcWy2wq_puT2fVSI3cUsTao-xl.iGpAAlxdAe3LguxpFjc5v',
                createdAt: expect.any(String),
                isMembership: false
            });

            blog1 = res_.body;
        });

        // create new post for specific blog
        it('POST blog: create post for specific blog', async () => {
            const res_ = await request(app)
                .post(`/blogs/${blog1!.id}/posts`)
                .auth('admin', 'qwerty')
                .send({
                        'title': 'post 1 for blog 1',
                        'shortDescription': 'description for post 1',
                        'content': 'content for post 1 for blog 1'
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                title: 'post 1 for blog 1',
                shortDescription: 'description for post 1',
                content: 'content for post 1 for blog 1',
                blogId: blog1!.id,
                blogName: blog1!.name,
                createdAt: expect.any(String),
            });

            post1 = res_.body;
        });

        //create user1
        it('POST user: create user 1', async () => {
            const res_ = await request(app)
                .post(`/users`)
                .auth('admin', 'qwerty')
                .send({
                        "login": "aig555",
                        "password": "password",
                        "email": "example@example.com"
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                login: "aig555",
                email: "example@example.com",
                createdAt: expect.any(String),
            });

            user1 = res_.body;
        });

        //create user2
        it('POST user: create user 2', async () => {
            const res_ = await request(app)
                .post(`/users`)
                .auth('admin', 'qwerty')
                .send({
                        "login": "aig666",
                        "password": "password",
                        "email": "ex@example.com"
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                id: expect.any(String),
                login: "aig666",
                email: "ex@example.com",
                createdAt: expect.any(String),
            });

            user2 = res_.body;
        });

        //create comments for post

        it('POST post: create comment', async () => {
            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .post(`/posts/${post1!.id}/comments`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'content': 'content content content',
                    }
                )
                .expect(201);

            expect(res_.body).toEqual({
                commentId: expect.any(String),
                content: 'content content content',
                commentatorInfo: {
                    userId: user1!.id,
                    userLogin: user1!.login,
                },
                createdAt: expect.any(String),
            });

            comment1 = res_.body;
        });


        it('GET comments: not found', async () => {
            const res_ = await request(app)
                .get(`/comments/6679b8c54240cb29866db2a9`)
                .expect(404)
        });

// get comment by id
        it('GET comments', async () => {
            const res_ = await request(app)
                .get(`/comments/${comment1!.commentId}`)
                .expect(200);

            expect(res_.body).toEqual({
                commentId: expect.any(String),
                content: "content content content",
                commentatorInfo: {
                    userId: user1!.id,
                    userLogin: user1!.login
                },
                createdAt: expect.any(String),
            });

        });

      // put comment
        it('PUT comments: unauthorized', async () => {
            const res_ = await request(app)
                .put(`/comments/${comment1!.commentId}`)
                .auth('admin', 'qwert')
                .send({
                        'content': 'new content new content',
                    }
                )
                .expect(401)

        });

        it('PUT comments: not found', async () => {

            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .put(`/comments/666c7d3a7cb61ded043586cd`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'content': 'new content new content',
                    }
                )
                .expect(404)

        });

        it('PUT comments: if try edit comment that is not your own', async () => {

            let userId = user2!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .put(`/comments/${comment1!.commentId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'content': 'new content new content',
                    }
                )
                .expect(403)

        });

        it('PUT comment', async () => {
            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .put(`/comments/${comment1!.commentId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'content': 'new content new content',
                    }
                )
                .expect(204);
        });

        it('PUT comment: incorrect values', async () => {
            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .put(`/comments/${comment1!.commentId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'content': '',
                    }
                )
                .expect(400, {
                    "errorsMessages": [
                        {
                            "message": "Incorrect comment",
                            "field": "content"
                        },
                    ]
                });

        });


        //delete

        it('DELETE comment: unauthorized', async () => {
            const res_ = await request(app)
                .delete(`/comments/${comment1!.commentId}`)
                .auth('admin', 'qwert')
                .expect(401)
        });

        it('DELETE comment: not found', async () => {
            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .delete(`/comments/6679b37eac60d2f87de0ece4`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });

        it('DELETE comment: if try delete comment that is not your own', async () => {

            let userId = user2!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .delete(`/comments/${comment1!.commentId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
        });

        it('DELETE comment', async () => {

            let userId = user1!.id;
            const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});

            const res_ = await request(app)
                .delete(`/comments/${comment1!.commentId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)
        });

    })
})

