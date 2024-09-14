from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from tinymce import models as tiny_models
from django.utils.safestring import mark_safe
from user.models import User
# Create your models here.

class Category(MPTTModel):
    title = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.title
    
    class MPTTMeta:
         order_insertion_by = ['title']



class Product(models.Model):
    category = models.ManyToManyField(Category)
    title = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='upload/', height_field=None, width_field=None, max_length=None)
    description = tiny_models.HTMLField(blank=True, null=True)
    short_description = models.TextField(blank=True, null=True)
    sku = models.CharField(max_length=64, unique=True)
    slug  = models.SlugField()
    regular_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    stock_status = models.CharField(max_length=20, choices=[('In Stock', 'In Stock'), ('Out of Stock', 'Out of Stock')])
    manage_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.sale_price:
            self.price = self.regular_price
        else:
            self.price = self.sale_price
        super().save(*args, **kwargs)

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
    value     = models.CharField(max_length=50)
    thumnail  = models.CharField(max_length=50,null=True,blank=True)
    attribute = models.ForeignKey("Attributes",related_name="values", on_delete=models.CASCADE)

    def __str__(self):
        return self.value






    """
        VARIANTS MODEL e.g: sku, stock, weight .etc
    """


class Variants(models.Model):
    attribute_values = models.ManyToManyField(AttributeValues, related_name='attribute_values', blank=True)
    product = models.ForeignKey(Product, related_name='variations', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    sku = models.CharField(max_length=64, unique=True, blank=True, null=True)
    regular_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    stock_status = models.CharField(max_length=20, choices=[('In Stock', 'In Stock'), ( 'Out of Stock', 'Out of Stock')])
    manage_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.title}-{self.title}"

    # def get_product(self):
    #     return Product.objects.get(product=product)


# class ProductAttributeDetail(models.Model):
#     variant = models.ForeignKey(Variants,related_name="values",on_delete=models.CASCADE)
#     attribute = models.ForeignKey(AttributeValues,on_delete=models.CASCADE)
#     is_active   = models.BooleanField(default=False)
#     products = models.ManyToManyField(ProductVariation, related_name='attribute_values', blank=True)

   


class ProductReview(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('pending', 'Pending'),
        ('rejected', 'Rejected'),
    ]
    
    rating = models.FloatField()
    customer = models.ForeignKey(User,null=True, blank=True, related_name='userreview',on_delete=models.CASCADE )
    product = models.ForeignKey(Product,related_name="productreview", on_delete=models.CASCADE)
    description = models.CharField(max_length=200,default='review')
    helpful_votes = models.IntegerField(null=True,blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10,default='pending')
    image = models.ImageField(upload_to='Reviews/upload',null=True,blank=True) 


    def __str__(self):
        return self.product.title
    


class ProductGallery(models.Model):
    title = models.CharField( max_length=50)  
    product = models.ForeignKey(Product,null=True,blank=True, on_delete=models.CASCADE)
    variants = models.ForeignKey(Variants,null=True,blank=True, on_delete=models.CASCADE)
    image  = models.ImageField( upload_to='upload/',)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)



    def __str__(self):
        return str(self.title)


    def img(self):
        return mark_safe(f"<img width='80' heigth='100' src={self.image.url}/>")