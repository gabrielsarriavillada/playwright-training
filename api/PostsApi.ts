import { APIRequestContext } from "@playwright/test";

export class PostsApi {
    constructor(private request: APIRequestContext) {}

    async getPosts() {
        return this.request.get('/posts');
    }

    async getPost(id: number) {
        return this.request.get(`/posts/${id}`);
    }

    async createPost(data: {
        title: string;
        body: string;
        userId: number;
    }) {
        return this.request.post('/posts', { data });
    }
}