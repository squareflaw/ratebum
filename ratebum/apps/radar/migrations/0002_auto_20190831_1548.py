# Generated by Django 2.1.7 on 2019-08-31 19:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('radar', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='radaritem',
            name='album',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='radars', to='music.Album'),
        ),
    ]
