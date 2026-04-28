import { APIRequestContext } from "@playwright/test";
import { API_BASE_URL } from "../playwright.config";

export class PostsApi {
    constructor(private request: APIRequestContext) {}

    async getPosts() {
        return this.request.get(`${API_BASE_URL}/posts`);
    }

    async getPost(id: number) {
        return this.request.get(`${API_BASE_URL}/posts/${id}`);
    }

    async createPost(data: {
        title: string;
        body: string;
        userId: number;
    }) {
        return this.request.post(`${API_BASE_URL}/posts`, { data });
    }
}