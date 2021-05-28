from django.db import models
from django.utils import timezone
from django.core import management
from django.db.models.signals import post_save
from django.conf import settings
from django.db.migrations.recorder import MigrationRecorder
import requests


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

    def __str__(self):
        return self.titre


def dump_new_instances(sender, **kwargs):
    if sender is MigrationRecorder.Migration:
        return
    print(f"{sender} has been saved !")
    requests.put(settings.JSONBLOB_URL, management.call_command("dumpdata"))


post_save.connect(dump_new_instances)
