# Generated by Django 2.1.5 on 2019-10-03 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0003_auto_20190903_0819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='genres',
            field=models.CharField(max_length=400),
        ),
        migrations.AlterField(
            model_name='artist',
            name='genres',
            field=models.CharField(max_length=400),
        ),
    ]
