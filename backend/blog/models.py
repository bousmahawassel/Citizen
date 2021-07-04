from django.db import models
from django.utils import timezone
from django.core import management
from django.db.models.signals import post_save
from django.conf import settings
from django.db.migrations.recorder import MigrationRecorder
import requests
from io import StringIO
import json
from functools import wraps


def disable_for_loaddata(signal_handler):
    """
    Decorator that turns off signal handlers when loading fixture data.
    """

    @wraps(signal_handler)
    def wrapper(*args, **kwargs):
        if kwargs.get('raw'):
            return
        signal_handler(*args, **kwargs)

    return wrapper


class Tag(models.Model):
    name = models.SlugField(verbose_name="nom")

    def __str__(self):
        return self.name


class Article(models.Model):
    contenu = models.TextField()
    titre = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now)
    tags = models.ManyToManyField(Tag)
    image = models.URLField(verbose_name="Lien de l'image")
    category = models.CharField(max_length=20, blank=True, default="", choices=[
        ("DC", "DC"),
        ("Marvel", "Marvel"),
        ("", "Aucune")
    ])

    def __str__(self):
        return self.titre


@disable_for_loaddata
def dump_new_instances(sender, instance, created, **kwargs):
    if sender is MigrationRecorder.Migration:
        return
    print(f"{sender} has been saved !")
    out = StringIO()
    management.call_command("dumpdata", stdout=out)
    requests.put(settings.JSONBLOB_URL, json=json.loads(out.getvalue()))
    if sender is Article and created:
        import discord
        client = discord.Client()

        @client.event
        async def on_ready():
            await client.get_channel(860580606705664041).send(
                "Nouvel article à découvrir sur l'application et le site web :"
                f" {instance.titre}")
            await client.close()
        client.run("ODYwOTA5NjAwMzMyNzA5OTI5.YOCGiw.c6dhgjTYm7YBYNtykFOvUBMC6tE")


post_save.connect(dump_new_instances)
