from django.urls import path
from . import views

urlpatterns = [
    path("get_all/", views.get_articles),
    path("get_all/<int:number>/", views.get_articles),
    path("get_all/<int:number>/<int:offset>/", views.get_articles),
    path("article/<int:id>/", views.article)
]