"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
exports.videosRouter = (0, express_1.Router)({});
const videos = [
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-11-11T18:01:12.021Z",
        publicationDate: "2023-11-11T18:01:12.021Z",
        availableResolutions: [
            "P144"
        ]
    }
];
exports.videosRouter.delete('/testing/all-data', (reg, res) => {
    videos.splice(0, videos.length);
    return res.sendStatus(204);
});
exports.videosRouter.get('/videos', (req, res) => {
    res.status(200).send(videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const video = videos.find((v) => v.id === id);
    if (!video) {
        return res.sendStatus(404);
    }
    res.send(video);
    return;
});
