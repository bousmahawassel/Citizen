from django.db import models
from django.utils import timezone


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
