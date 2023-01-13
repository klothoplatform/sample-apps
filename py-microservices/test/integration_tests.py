import os
import requests

test_username = "timmy"
apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')


def test_add_user():
    actual_put_response = requests.post(f"{apiEndpoint}/users/{test_username}")
    expected_put_response = f"Created {test_username}"
    assert actual_put_response.text == expected_put_response


def test_get_user():
    actual_get_response = requests.get(f"{apiEndpoint}/users/{test_username}")
    actual_user = actual_get_response.json()
    assert actual_user["id"] == test_username
