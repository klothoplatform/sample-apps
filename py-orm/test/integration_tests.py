import os
import requests
import json

apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')
user = "spongebob"

def test_put_user():
    actual_put_response = requests.put(f"{apiEndpoint}/")
    expected_put_response = "Success"
    assert expected_put_response in actual_put_response.text

def test_get_user():
    actual_get_response = requests.get(f"{apiEndpoint}/{user}")
    json_data = json.loads(actual_get_response.text)
    assert json_data[0]["User"]["name"] == user