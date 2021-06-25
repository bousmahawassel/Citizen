from django.urls import path
from . import views

urlpatterns = [
    path("articles/last/", views.get_articles),
    path("articles/last/<int:page>/", views.get_articles),
    path("search/id/<int:id>/", views.article),
    path("search/", views.search),
    path("search/<int:page>/", views.search)
]