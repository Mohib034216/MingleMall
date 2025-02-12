from django.db import models
from order.models import Order

# Create your models here.

class PaymentMethod(models.Model):
    METHOD_CHOICES = [
        ('credit_card', 'Credit Card'),
        ('COD', 'Cash On Delivery'),
        # ('paypal', 'PayPal'),
        ('stripe', 'Stripe'),
        ]
    title = models.CharField(choices=METHOD_CHOICES, max_length=50  , unique=True)
    is_active = models.BooleanField(default=1)

class Payment(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Success', 'Success'),
        ('Refund', 'Refund'),
        ('Failed', 'Failed'),
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    transaction = models.CharField(max_length=100)
    payment_status = models.CharField(choices=STATUS_CHOICES, max_length=10, default='pending')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.transaction} - {self.get_payment_status_display()}"


class Transaction(models.Model):    
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="transactions")
    getway_response = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
            return f"Transaction {self.id} - Payment{payment.transaction}"