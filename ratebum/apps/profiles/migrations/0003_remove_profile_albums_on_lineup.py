# Generated by Django 2.1.7 on 2019-08-31 21:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20190831_1515'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='albums_on_lineup',
        ),
    ]