from django.contrib import admin
from .models import * 

# Register your models here.


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','customer','order_date','total','status')

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id','order','product','variant','quantity','price')


admin.site.register(Order,OrderAdmin)
admin.site.register(OrderItem,OrderItemAdmin)