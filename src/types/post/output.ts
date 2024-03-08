
export type OutputItemPostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type OutputPostType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutputItemPostType[]
}


export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}