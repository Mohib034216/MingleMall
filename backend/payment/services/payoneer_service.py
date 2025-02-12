import requests

from django.conf import settings

class PayoneerService:
    def __init__(self):
        self.base_url = settings.PAYONEER_API_BASE_URL
        self.client_id = settings.PAYONEER_CLIENT_ID
        self.client_secret = settings.PAYONEER_CLIENT_SECRET

    def get_access_token(self):
        url = f"{self.base_url}/oauth2/token"
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        data = {
            'grant_type': 'client_credentials',
            'client_id': self.client_id,
            'client_secret': self.client_secret,
        }
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            return response.json().get('access_token')
        return None

    def make_payment(self, payee_id, amount, currency, description):
        access_token = self.get_access_token()
        if not access_token:
            return {'error': 'Unable to authenticate with Payoneer'}

        url = f"{self.base_url}/payees/{payee_id}/payments"
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
        }
        data = {
            'amount': amount,
            'currency': currency,
            'description': description,
        }
        response = requests.post(url, headers=headers, json=data)
        return response.json()
