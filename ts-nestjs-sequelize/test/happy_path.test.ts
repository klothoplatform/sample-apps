import {expect} from '@jest/globals';

const testUserName = "john"
const testUserLastName = "doe"
const testId = "1"
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
            url: `${apiEndpoint}/users/`,
            data: {
                firstName: testUserName,
                lastName: testUserLastName,
                id: testId
              }
        });
        
        expect(actualPutResponse.status).toBe(201)
    })

    test('Get User', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/users/${testId}`,
        });
        const users = actualGetResponse.data
        expect(users["firstName"]).toBe(testUserName)
        expect(users["lastName"]).toBe(testUserLastName)
        expect(users["id"]).toBe(testId)

    })

    test('Get All Users', async () => {
        const actualGetResponse = await axios({
            method: 'get',
            url: `${apiEndpoint}/users`,
        });
        const users = actualGetResponse.data
        expect(users).toHaveLength(1)
        expect(users[0]["firstName"]).toBe(testUserName)
        expect(users[0]["lastName"]).toBe(testUserLastName)
        expect(users[0]["id"]).toBe(testId)

    })
})