import os
import requests

apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')


def test_get_secret():
    actual_get_response = requests.get(apiEndpoint)
    expected_get_response = "very secret"
    assert actual_get_response.text == expected_get_response
