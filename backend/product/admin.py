from django.contrib import admin
from .models import Product, Variants, ProductGallery, ProductReview
from .Form import ProductForm, VariantsForm, ProductGalleryForm

class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    form = ProductGalleryForm
    extra = 1

class VariantsInline(admin.TabularInline):
    model = Variants
    form = VariantsForm
    extra = 1
    inlines = [ProductGalleryInline]

class ProductAdmin(admin.ModelAdmin):
    form = ProductForm
    inlines = [VariantsInline]
    list_display = ('title', 'sku', 'price', 'stock_quantity', 'img')
    readonly_fields = ('img',)

    def img(self, obj):
        return obj.img()
    img.allow_tags = True

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductReview)

