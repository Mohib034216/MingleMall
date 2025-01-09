from django.contrib import admin
from django_tabbed_changeform_admin.admin import TabbedModelAdmin
from .models import Product, Variants, Attributes
from Form import ProductGeneralForm

class ProductAdmin(TabbedModelAdmin):
    tab_overrides = {
        'General': ProductGeneralForm,
        'Inventory': ProductInventoryForm,
        # Add other forms as needed
    }

    tabbed_form_template = 'admin/product_form.html'

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        return form

admin.site.register(Product, ProductAdmin)
