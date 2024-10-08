from django.db import models
from django.contrib.auth.models import  AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.

class CustomUserManger(BaseUserManager):
    def create_superuser(self,username,email,password,**other_fields):
        other_fields.setdefault('is_superadmin',True)
        other_fields.setdefault('is_admin',True)
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_active',True)
        
        if other_fields.get('is_staff') is not True:
            raise ValueError(
                "superuser must be assigned to is_staff=True"
            )
        if other_fields.get('is_admin') is not True:
            raise ValueError(
                "superuser must be assigned to is_admin=True"
            )
        if other_fields.get('is_superadmin') is not True:
            raise ValueError(
                "superuser must be assigned to is_superadmin=True"
            )

        return self.create_user(username,email,password,**other_fields)
    

    def create_user(self,username,email,password=None,**other_fields):
        if not email:
            raise ValueError('user must have email  address')
        if not username:
            raise ValueError('User must have username')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            **other_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user 

class User(AbstractBaseUser):
    username = models.CharField(max_length=100,unique=True)
    email = models.EmailField(max_length=100,unique=True)
    optional_email= models.EmailField(max_length=100,unique=True,null=True,blank=True)
    phone = models.CharField(error_messages={'unique':"This phone has already been registered."},max_length=20,unique=True,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)


    object = CustomUserManger()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


    class AddressBook(models.Model):
        user = models.ForeignKey('User', on_delete=models.CASCADE)
        label = models.CharField(default='Home',unique=True, max_length=15)
        full_name =  models.CharField( max_length=50)
        phone = models.CharField(max_length=15, blank=True, null=True)
        address = models.CharField( max_length=400)
        city = models.CharField( max_length=50)
        country = models.CharField( max_length=50)
        is_shipping = models.BooleanField(default=False)
        is_billing = models.BooleanField(default=False)
        created_at =  models.DateTimeField( auto_now_add=True)
        updated_at =  models.DateTimeField( auto_now=True)

        def save(self, *args, **kwargs):
            if not self.phone and self.user:
                self.phone = self.user.phone
            super(AddressBook, self).save(*args, **kwargs)




       

