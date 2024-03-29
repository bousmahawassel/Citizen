from django.urls import path
from . import views

urlpatterns = [
    path("articles/last/", views.get_articles),
    path("articles/last/<int:page>/", views.get_articles),
    path("search/id/<int:id>/", views.article),
    path("search/tag/<str:tag>/", views.articles_by_tag),
]