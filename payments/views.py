from django.shortcuts import render
from django.http import JsonResponse
import logging
from .services import create_payment_intent

# Configure logging
logger = logging.getLogger(__name__)

def initiate_payment(request):
    if request.method == "POST":
        try:
            amount = float(request.POST.get("amount"))
            payment_method = request.POST.get("payment_method")
            logger.info(f"Initiating payment with amount: {amount} and method: {payment_method}")
            payment_intent = create_payment_intent(amount, payment_method=payment_method)
            return JsonResponse(payment_intent)
        except Exception as e:
            logger.error(f"Error during payment initiation: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)
    return render(request, "payments/initiate_payment.html")
