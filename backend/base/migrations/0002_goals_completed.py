# Generated by Django 4.1.3 on 2022-11-17 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="goals",
            name="completed",
            field=models.BooleanField(default=False),
        ),
    ]