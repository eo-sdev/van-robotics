# Generated by Django 4.2 on 2023-04-24 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClassBatch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, max_length=100, null=True)),
                ('instructor', models.TextField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Learner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField(blank=True, max_length=100, null=True)),
                ('last_name', models.TextField(blank=True, max_length=100, null=True)),
                ('grade', models.TextField(blank=True, max_length=2, null=True)),
                ('classbatch', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='rosters.classbatch')),
            ],
        ),
    ]
