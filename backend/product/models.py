from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from tinymce import models as tiny_models
from django.utils.safestring import mark_safe
# Create your models here.

class Category(MPTTModel):
    title = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    class MPTTMeta:
         order_insertion_by = ['title']


class Product(models.Model):
    title = models.CharField( max_length=50)
    thumbnail = models.ImageField(upload_to='upload/', height_field=None, width_field=None, max_length=None)
    description = tiny_models.HTMLField()
    slug = models.SlugField(unique=True)
    is_active   = models.BooleanField(default=False)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)



    def __str__(self):
        return self.title

    def img(self):
        return mark_safe(f"<img width='90' height='100' src={self.thumbnail.url}>")
    

    """
            ATTRIBUTE MODEL e.g: Color, Size .etc
    """

class Attributes(models.Model):
    title = models.CharField( max_length=50)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)


    def __str__(self):
        return self.title
    


    """
            ATTRIBUTE VALUES MODEL e.g: Red, Blue .etc
    """

class AttributeValues(models.Model):
    title     = models.CharField(max_length=50)
    thumnail  = models.CharField(max_length=50,null=True,blank=True)
    attribute = models.ForeignKey("Attributes",  on_delete=models.CASCADE)

    def __str__(self):
        return self.title



    """
        VARIANTS MODEL e.g: sku, stock, weight .etc
    """


class Variants(models.Model):
    title = models.CharField(max_length=50)
    product = models.ForeignKey("Product",  on_delete=models.CASCADE)
    # attribute_values = models.ForeignKey("AttributeValues",  on_delete=models.CASCADE)
    stock =  models.PositiveIntegerField()
    sku = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)


    def __str__(self):
        return f"{self.product.title}-{self.title}"

class ProductAttributeDetail(models.Model):
    variant = models.ForeignKey("Variants",on_delete=models.CASCADE)
    attribute = models.ForeignKey("AttributeValues",on_delete=models.CASCADE)
    is_active   = models.BooleanField(default=False)
   

    

class ProductGallery(models.Model):
    title = models.CharField( max_length=50)  
    product = models.ForeignKey("Product",null=True,blank=True, on_delete=models.CASCADE)
    Variants = models.ForeignKey("Variants",null=True,blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)