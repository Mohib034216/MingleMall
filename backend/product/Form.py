from django import forms
from .models import Product, Variants, ProductGallery, AttributeValues

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

class VariantsForm(forms.ModelForm):
    class Meta:
        model = Variants
        fields = '__all__'

class ProductGalleryForm(forms.ModelForm):
    class Meta:
        model = ProductGallery
        fields = '__all__'
