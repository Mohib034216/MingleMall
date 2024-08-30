from django.contrib import admin
from django import forms
from .models import  *
from django.forms.models import BaseInlineFormSet
# Register your models here.

class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 1  # Number of empty forms to display by default

class VariantInlineFormSet(BaseInlineFormSet):
    def add_fields(self, form, index):
        super().add_fields(form, index)
        # Attach the related ImageGallery queryset to the form
        if form.instance.pk:
            form.gallery = ProductGallery.objects.filter(variant=form.instance)
        else:
            form.gallery = ProductGallery.objects.none()

class VariantInline(admin.StackedInline):
    model = Variants
    # formset = VariantInlineFormSet  # Use the custom formset
    extra = 1
    # template = 'admin/edit_inline/stacked_variant_inline.html'
    inlines = [ProductGalleryInline]  # Inlines for the nested ImageGallery

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'img','slug','description')  
    search_fields = ('title',)      
    prepopulated_fields = {'slug': ('title',)}
    inlines = [VariantInline,]

admin.site.register(Product, ProductAdmin)



class VariantsAdmin(admin.ModelAdmin):
    list_display =  ('id','title', 'product','stock','sku','price') 
    search_fields = ('title',)  
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProductGalleryInline]


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

class ProductGalleryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title','img','product','variants')  
    search_fields = ('title',)  


admin.site.register(ProductGallery, ProductGalleryAdmin)
admin.site.register(ProductReview)
admin.site.register(Category)
