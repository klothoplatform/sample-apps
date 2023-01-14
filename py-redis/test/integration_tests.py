import os
import requests

test_user_name = "john"
test_user_last_name = "doe"
apiEndpoint = os.environ.get("API_ENDPOINT", 'http://localhost:3000')


def test_add_user():
    actual_post_response = requests.post(
        f"{apiEndpoint}/users",
        json={
            "first_name": test_user_name,
            "last_name": test_user_last_name
        })
    expected_post_response = "Success"
    assert actual_post_response.text == expected_post_response


def test_get_user():
    actual_get_response = requests.get(f"{apiEndpoint}/users/{test_user_name}")
    actual_user = actual_get_response.text
    assert actual_user == test_user_last_name
