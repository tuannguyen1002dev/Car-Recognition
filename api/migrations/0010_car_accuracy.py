# Generated by Django 3.2.5 on 2021-08-01 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_car_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='accuracy',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
