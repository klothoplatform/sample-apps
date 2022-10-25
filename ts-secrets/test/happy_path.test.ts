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

    test('Get Secret', async () => {
        const actualResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/`,
        });
        
        const expectedPutResponse =  `very secret\n`
        expect(actualResponse.data).toBe(expectedPutResponse)
    })
})