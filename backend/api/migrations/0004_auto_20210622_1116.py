# Generated by Django 3.2.3 on 2021-06-22 04:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_engine_car_engines'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='engines',
            new_name='engineType',
        ),
        migrations.AlterField(
            model_name='vtypeengine',
            name='VType',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.engine'),
        ),
    ]
