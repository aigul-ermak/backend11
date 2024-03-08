"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const output_1 = require("../types/video/output");
const db_1 = require("../db/db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.delete('/testing/all-data', (reg, res) => {
    db_1.db.videos.splice(0, db_1.db.videos.length);
    return res.sendStatus(204);
});
exports.videosRouter.get('/videos', (req, res) => {
    res.status(200).send(db_1.db.videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const video = db_1.db.videos.find((v) => v.id === id);
    if (!video) {
        return res.sendStatus(404);
    }
    res.send(video);
    return;
});
exports.videosRouter.post('/videos', (req, res) => {
    let error = {
        errorsMessages: []
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        error.errorsMessages.push({ message: "Error", field: "title" });
    }
    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        error.errorsMessages.push({ message: "Error", field: "author" });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((r) => {
            !output_1.AvailableResolutions.includes(r) && error.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (error.errorsMessages.length) {
        res.status(400).send(error);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    };
    db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put('/videos/:id', (req, res) => {
    const id = +req.params.id;
    let error = {
        errorsMessages: []
    };
    let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        error.errorsMessages.push({ message: "Invalid title", field: "title" });
    }
    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        error.errorsMessages.push({ message: "Invalid author", field: "author" });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((r) => {
            !output_1.AvailableResolutions.includes(r) && error.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (typeof canBeDownloaded === "undefined") {
        canBeDownloaded = false;
    }
    if (typeof canBeDownloaded !== "boolean") {
        error.errorsMessages.push({
            message: "Invalid canBeDownLoaded",
            field: "canBeDownloaded"
        });
    }
    if (typeof minAgeRestriction !== "undefined" && typeof minAgeRestriction === "number") {
        minAgeRestriction < 1 || minAgeRestriction > 18
            && error.errorsMessages.push({ message: "Invalid minAgeRestriction", field: "minAgeRestriction" });
    }
    else {
        minAgeRestriction = null;
    }
    const pDate = (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gi).test(publicationDate);
    if (typeof publicationDate !== "undefined" && !pDate) {
        error.errorsMessages.push({
            message: "Invalid publicationDate",
            field: "publicationDate"
        });
    }
    if (error.errorsMessages.length) {
        res.status(400).send(error);
        return;
    }
    const videoIndex = db_1.db.videos.findIndex(v => v.id === id);
    const video = db_1.db.videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    const updatedItem = Object.assign(Object.assign({}, video), { availableResolutions: availableResolutions, canBeDownloaded,
        minAgeRestriction,
        title,
        author, publicationDate: publicationDate ? publicationDate : video.publicationDate });
    db_1.db.videos.splice(videoIndex, 1, updatedItem);
    res.send(204);
});
exports.videosRouter.delete('/videos/:id', (req, res) => {
    const id = +req.params.id;
    let error = {
        errorsMessages: []
    };
    const videoIndex = db_1.db.videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
        res.sendStatus(404);
        return;
    }
    db_1.db.videos.splice(videoIndex, 1);
    if (error.errorsMessages.length) {
        res.status(400).send(error);
        return;
    }
    res.send(204);
});
//# sourceMappingURL=videos-router.js.map