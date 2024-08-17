import requests
import json
import logging
from decimal import Decimal
from .models import Purchase

API_KEY = "pk_test_vTZohAgZJmS46rBJ9H66AJf1"
API_URL = "https://api.paymongo.com/v1/payment_intents"

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_payment_intent(amount, currency="PHP", payment_method="paymaya"):
    headers = {
        "Authorization": f"Basic {API_KEY}",  # Pass the API key directly
        "Content-Type": "application/json",
    }

    data = {
        "data": {
            "attributes": {
                "amount": int(amount * 100),  # Convert to cents
                "currency": currency,
                "payment_method_allowed": [payment_method],
                "description": "Payment description",
            }
        }
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(data))

    if response.status_code == 201:
        payment_intent_data = response.json()
        payment_intent_id = payment_intent_data['data']['id']
        status = payment_intent_data['data']['attributes']['status']

        # Save purchase to the database
        try:
            purchase = Purchase(
                amount=Decimal(amount),
                currency=currency,
                payment_method=payment_method,
                payment_intent_id=payment_intent_id,
                status=status
            )
            purchase.save()
            logger.info(f"Purchase saved to database: {purchase}")
            return payment_intent_data
        except Exception as e:
            logger.error(f"Failed to save purchase to database: {str(e)}")
            raise
    else:
        logger.error(f"Failed to create payment intent: {response.text}")
        raise Exception(f"Failed to create payment intent: {response.text}")
