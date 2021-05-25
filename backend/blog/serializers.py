from rest_framework import serializers
from .models import Article, Tag


class ArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", read_only=True)
    class Meta:
        model = Article
        fields = "__all__"


class ArticleApercuSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", read_only=True)
    class Meta:
        model = Article
        fields = ['id', 'titre', 'date', 'tags', 'image']