export type CommentDBType = {
    id: string,
    postId: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
    likes: LikeDBModel
}

type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type LikeDBModel = {
    userId: string,
    status: string
}


export type OutputItemCommentType = {
    commentId: string,
    postId: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string
}


export type OutputCommentType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutputItemCommentType[]
}

export type SortCommentType = {
    sortBy?: string,
    sortDirection?: 'acs' | 'desc',
    pageNumber?: number,
    pageSize?: number
};

