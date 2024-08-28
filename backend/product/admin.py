from django.contrib import admin
from .models import  *

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'img','slug','description')  
    search_fields = ('title',)      
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Product, ProductAdmin)



class VariantsAdmin(admin.ModelAdmin):
    list_display =  ('id','title', 'product','stock','sku','price') 
    search_fields = ('title',)  
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Variants, VariantsAdmin)


class AttributesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)  
    search_fields = ('title',)      

admin.site.register(Attributes, AttributesAdmin)

class AttributeValuesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)  
    search_fields = ('title',)      

admin.site.register(AttributeValues, AttributeValuesAdmin)



class ProductAttributeDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'variant','attribute',)  
    search_fields = ('title',)  
        

admin.site.register(ProductAttributeDetail, ProductAttributeDetailAdmin)