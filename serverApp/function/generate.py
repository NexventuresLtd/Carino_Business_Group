import uuid
import requests
import os
from dotenv import load_dotenv

load_dotenv()

MOMO_SUBSCRIPTION_KEY = os.getenv("MOMO_SUBSCRIPTION_KEY")
MOMO_BASE_URL = "https://sandbox.momodeveloper.mtn.com"


def create_api_user(callback_host: str = "https://example.com") -> str:
    """
    Creates an API user in the MoMo sandbox and returns the generated user ID (UUID).
    """
    user_id = str(uuid.uuid4())  # unique reference ID
    url = f"{MOMO_BASE_URL}/v1_0/apiuser"
    headers = {
        "X-Reference-Id": user_id,
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "providerCallbackHost": callback_host
    }

    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()

    return user_id


def generate_api_key(user_id: str) -> str:
    """
    Generates an API key for a given API user ID.
    """
    url = f"{MOMO_BASE_URL}/v1_0/apiuser/{user_id}/apikey"
    headers = {
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
    }

    response = requests.post(url, headers=headers)
    response.raise_for_status()
    return response.json()["apiKey"]


def provision_api_credentials() -> dict:
    """
    Creates an API user + API key and returns both.
    """
    user_id = create_api_user()
    api_key = generate_api_key(user_id)
    return {
        "user_id": user_id,
        "api_key": api_key
    }


if __name__ == "__main__":
    creds = provision_api_credentials()
    print("✅ API User:", creds["user_id"])
    print("✅ API Key:", creds["api_key"])
