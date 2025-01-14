from rest_framework import serializers
from .models import User, AddressBook
from rest_framework_simplejwt.tokens import RefreshToken



# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id','username','email','password','phone','is_admin','is_staff','is_superadmin']
#         extra_kwargs = {'passsword':{'write_only':True}}


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.object.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user




class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        try:
            user = User.object.get(email=email)

        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email/password.")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid email/password.")

        refresh = RefreshToken.for_user(user)  
        # data['user']  = user

        data['token'] = str(refresh.access_token)
        print(data)

        return data




class AddressBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressBook
        fields =  ['user','full_name','phone_number','province','city','building','landmark','address','label','is_shipping','is_billing'] 
        # fields =  '__all__'
       
        # def create(self,validated_data):
        #     return super().create(**validated_data)
    