import {expect} from '@jest/globals';

const testKey = "myTestKey"
const testValue = "myTestValue"
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
            url: `${apiEndpoint}/item/`,
            data: {
                key: testKey,
                value: testValue
              }
        });
        
        const expectedPutResponse =  `success`
        expect(actualPutResponse.data).toBe(expectedPutResponse)
    })

    test('Get User', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/item/${testKey}`,
        });
        const users = actualGetResponse.data
        expect(users).toBe(testValue)

    })
})