# Generated by Django 2.1.7 on 2019-08-31 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0002_auto_20190831_1515'),
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RadarItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('item_type', models.CharField(choices=[('artist', 'Artist'), ('album', 'Album')], default=('artist', 'Artist'), max_length=6)),
                ('spotify_id', models.CharField(max_length=30)),
                ('album', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='radars', to='music.Album')),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='radars', to='music.Artist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='radar_items', to='profiles.Profile')),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
    ]
