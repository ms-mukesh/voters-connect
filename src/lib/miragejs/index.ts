/**
 * Mirage JS is an API mocking library that lets you build, test and share a complete working
 * JavaScript application without having to rely on any backend services.
 */

import { createServer } from 'miragejs';

export const makeServer = (
    namespace: string,
    endpoint: string,
    mockData: any
) => {
    return createServer({
        routes() {
            this.namespace = namespace;
            this.get(endpoint, () => {
                return {
                    [endpoint]: mockData,
                };
            });
        },
    });
};

/**
 *
 * For making API call,
 *
 * fetch('/api/todos')
 *      .then(response=>response.json())
 *      .then(json=>console.log(json.todos))
 *      .catch(err=>console.log(err))
 *
 */
