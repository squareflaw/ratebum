# Generated by Django 2.1.7 on 2019-08-27 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=80)),
                ('spotify_id', models.CharField(max_length=30)),
                ('spotify_url', models.URLField()),
                ('release_date', models.DateField()),
                ('image_url', models.URLField()),
                ('genres', models.CharField(max_length=80)),
                ('total_tracks', models.SmallIntegerField()),
                ('duration_ms', models.IntegerField()),
                ('popularity', models.SmallIntegerField()),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=30)),
                ('spotify_id', models.CharField(max_length=30)),
                ('spotify_url', models.URLField()),
                ('image_url', models.URLField()),
                ('genres', models.CharField(max_length=80)),
                ('followers', models.PositiveIntegerField()),
                ('popularity', models.SmallIntegerField()),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('spotify_id', models.CharField(max_length=30)),
                ('preview_url', models.URLField()),
                ('duration_ms', models.IntegerField()),
                ('track_number', models.SmallIntegerField()),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tracks', to='music.Album')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to='music.Artist'),
        ),
    ]