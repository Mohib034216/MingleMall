# Generated by Django 4.2.15 on 2024-09-03 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(default=0),
            preserve_default=False,
        ),
    ]
