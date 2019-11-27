# Generated by Django 2.1.7 on 2019-08-27 17:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('music', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('image', models.URLField(blank=True, null=True)),
                ('albums_on_lineup', models.ManyToManyField(related_name='saved_on_lineup_by', to='music.Album')),
                ('albums_on_radar', models.ManyToManyField(related_name='saved_on_radar_by', to='music.Album')),
                ('artists_on_lineup', models.ManyToManyField(related_name='saved_on_lineup_by', to='music.Artist')),
                ('artists_on_radar', models.ManyToManyField(related_name='saved_on_radar_by', to='music.Artist')),
                ('follows', models.ManyToManyField(related_name='followed_by', to='profiles.Profile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
    ]