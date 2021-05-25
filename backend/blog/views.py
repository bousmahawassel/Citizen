from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Article, Tag

@api_view(["GET"])
def get_articles(request, offset=0, number=20):
    offset += 1
    return Response(list(range(offset, offset+number)), status.HTTP_200_OK)