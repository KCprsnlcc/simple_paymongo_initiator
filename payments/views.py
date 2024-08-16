from django.shortcuts import render
from django.http import JsonResponse
from .services import create_payment_intent

def initiate_payment(request):
    if request.method == "POST":
        try:
            amount = int(request.POST.get("amount")) * 100
            payment_intent = create_payment_intent(amount)
            return JsonResponse(payment_intent)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return render(request, "payments/initiate_payment.html")
