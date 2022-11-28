import {expect} from '@jest/globals';

const testUserName = "timmy"
const axios = require('axios');
const apiEndpoint = process.env['API_ENDPOINT']

/**
 * @group integration
 */
describe('Happy Path Test', () => {

    beforeAll(() => {
        // Eventually we will want to clear db, etc
    });

    test('Add User', async () => {
        const actualPutResponse = await axios({
            method: 'put',
            url: `${apiEndpoint}/users/${testUserName}`,
        });
        
        const expectedPutResponse =  `Created ${testUserName}`
        expect(actualPutResponse.data).toBe(expectedPutResponse)
    })

    test('Get User', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/users/`,
        });
        const users: string[] = actualGetResponse.data
        expect(users).toHaveLength(1)
        expect(users).toContain(testUserName)
    })
})