from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .serializers import Article, Tag, ArticleSerializer, ArticleApercuSerializer


@api_view(["GET"])
def get_articles(request, offset=0, number=20):
    articles = Article.objects.all().order_by('date')[offset:offset+number]
    return Response(ArticleApercuSerializer(articles, many=True).data, status.HTTP_200_OK)