"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMapper = void 0;
const commentMapper = (comment) => {
    let CommentatorInfo;
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
    };
};
exports.commentMapper = commentMapper;
//# sourceMappingURL=mapper.js.map