import {expect} from '@jest/globals';

const testUserName = "john"
const testUserLastName = "doe"
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
            method: 'post',
            url: `${apiEndpoint}/user/`,
            data: {
                firstName: testUserName,
                lastName: testUserLastName
              }
        });
        
        const expectedPutResponse =  `success`
        expect(actualPutResponse.data).toBe(expectedPutResponse)
    })

    test('Get User', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/user/${testUserName}`,
        });
        const lastName = actualGetResponse.data
        expect(lastName).toBe(testUserLastName)
    })
})