# Generated by Django 4.2.15 on 2024-09-13 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_alter_product_stock_status_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='variants',
            old_name='variation_name',
            new_name='title',
        ),
    ]
