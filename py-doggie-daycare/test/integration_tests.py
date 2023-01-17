import os
import requests
import json

apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')

owner = "Ala"
pet = "Noodle"

def test_post_pets():
    Headers = {"Content-Type": "application/json"}
    data = {"owner": owner, "pet": pet}
    actual_post_response = requests.post(f"{apiEndpoint}/pets", json=data, headers=Headers)
    expected_put_response = "\"Added Noodle as Ala's pet\""
    assert expected_put_response == actual_post_response.text

def test_get_pet():
    actual_get_response = requests.get(f"{apiEndpoint}/owners/{owner}/pets")
    data = json.loads(actual_get_response.text)
    assert data[0] == pet
