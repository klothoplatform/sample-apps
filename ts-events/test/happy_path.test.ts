import {expect} from '@jest/globals';

const testUser = "user"
const axios = require('axios');
const apiEndpoint = process.env['API_ENDPOINT']

/**
 * @group integration
 */
describe('Happy Path Test', () => {

    beforeAll(() => {
        // Eventually we will want to clear db, etc
    });

    test('post async', async () => {
        const actualResponse = await axios({
            method: 'post',
            url: `${apiEndpoint}/hello/${testUser}`,
        });
        
        expect(actualResponse.status).toBe(201)
    })

    test('get', async () => {
        let actualResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/hello/${testUser}`,
        });
        
        expect(actualResponse.data).toBe(testUser)
    })
})
