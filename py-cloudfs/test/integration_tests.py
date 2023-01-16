import os
import requests

apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')


def test_get_file():
    actual_get_response = requests.get(f"{apiEndpoint}/")
    expected_put_response = "Startup at"
    assert expected_put_response in actual_get_response.text

