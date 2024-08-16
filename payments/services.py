import requests
import json

# Use your secret key
API_KEY = "sk_test_8jcvwsSRDKr427k7UsRKgrSi"
API_URL = "https://api.paymongo.com/v1/payment_intents"

def create_payment_intent(amount, currency="PHP"):
    headers = {
        "Authorization": f"Basic {API_KEY.encode().decode('utf-8')}",
        "Content-Type": "application/json",
    }

    data = {
        "data": {
            "attributes": {
                "amount": amount,
                "currency": currency,
                "payment_method_allowed": ["paymaya", "card"],
                "description": "Payment description",
            }
        }
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(data))

    if response.status_code == 201:
        return response.json()  # Successfully created payment intent
    else:
        raise Exception(f"Failed to create payment intent: {response.text}")
