
export enum LIKE_STATUS {
    LIKE = 'Like',
    DISLIKE = 'Dislike',
    NONE = 'None'
}

export type LikeDBModel = {
    id: string
    status: LIKE_STATUS,
    userId: string,
    parentId: string
}
