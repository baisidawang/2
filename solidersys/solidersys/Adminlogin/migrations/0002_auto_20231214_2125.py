# Generated by Django 2.0 on 2023-12-14 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Adminlogin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
