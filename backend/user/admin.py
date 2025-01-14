from django.contrib import admin
from .models import *

# Register your models here.



class UserAdmin(admin.ModelAdmin):
    list_display =['email']

class AddressBookAdmin(admin.ModelAdmin):
    list_display = ["user", "full_name", "phone_number", "address", "city", "is_shipping", "is_billing"]



admin.site.register(User, UserAdmin)

admin.site.register(AddressBook, AddressBookAdmin)
