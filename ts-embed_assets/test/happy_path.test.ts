import {expect} from '@jest/globals';

const axios = require('axios');
const apiEndpoint = process.env['API_ENDPOINT']

/**
 * @group integration
 */
describe('Happy Path Test', () => {

    beforeAll(() => {
        // Eventually we will want to clear db, etc
    });

    test('Get hello', async () => {
        const actualResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/hello`,
        });
        
        expect(actualResponse.data).toContain("hi")
    })

    test('Get static hello', async () => {
        const actualResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/static/hello.txt`,
        });
        
        expect(actualResponse.data).toContain("Hello Klotho!")
    })
})