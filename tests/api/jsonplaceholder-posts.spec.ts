import { test, expect } from '@playwright/test';

test.describe('Posts API', () => {
    test('should return a list of posts', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts');

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('title');
        expect(body[0]).toHaveProperty('body');
    });

    test('should return a single post', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

        await expect(response).toBeOK();

        const body = await response.json();

        expect(body.id).toBe(1);
        expect(body.userId).toBeTruthy();
        expect(body.title).toBeTruthy();
    });

    test('should return 404 for non-existing post', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');

        expect(response.status()).toBe(404);
    });

    test('should create a post', async ({ request }) => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                title: 'Playwright API testing',
                body: 'Learning API testing with Playwright',
                userId: 1,
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.title).toBe('Playwright API testing');
        expect(body.body).toBe('Learning API testing with Playwright');
        expect(body.userId).toBe(1);
        expect(body.id).toBeTruthy();
    });
});
