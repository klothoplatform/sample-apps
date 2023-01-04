import {expect} from '@jest/globals';

const testUserName = "timmy"
const testOrg = "engineering"
const testAge = 30
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

    test('Add User info', async () => {
        const actualPutResponse = await axios({
            method: 'post',
            url: `${apiEndpoint}/users/${testUserName}/info`,
            data: {
                age: testAge,
                org: testOrg
            }
        });
        
        const expectedPutResponse =  `success`
        expect(actualPutResponse.data).toBe(expectedPutResponse)
    })

    test('Get User org', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/users/${testUserName}/info`,
        });
        const org: string = actualGetResponse.data
        expect(org).toContain(testOrg)
    })
})