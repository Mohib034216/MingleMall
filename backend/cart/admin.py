from django.contrib import admin
from .models import * 

# Register your models here.


class CartAdmin(admin.ModelAdmin):
        list_display = ('id','customer')

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id','cart','product','variant','quantity','price')


admin.site.register(Cart,CartAdmin)
admin.site.register(CartItem,CartItemAdmin)