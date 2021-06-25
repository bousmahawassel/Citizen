from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .serializers import Article, Tag, ArticleSerializer, ArticleApercuSerializer


@api_view(["GET"])
def get_articles(request, page=0):
    articles = Article.objects.all().order_by('-date')[page * 10:page * 10 + 10]
    return Response({"articles": ArticleApercuSerializer(articles, many=True).data, "page": page}, status.HTTP_200_OK)


@api_view(["GET"])
def article(request, id):
    try:
        article = Article.objects.get(pk=id)
    except:
        return Response("article not found", status.HTTP_404_NOT_FOUND)
    return Response(ArticleSerializer(article).data, status.HTTP_200_OK)


@api_view(["POST"])
@method_decorator(csrf_exempt)
def search(request, page=0):
    articles = Article.objects.filter(**request.data)
    return Response({"articles": ArticleApercuSerializer(articles, many=True).data, "page": page}, status.HTTP_200_OK)
