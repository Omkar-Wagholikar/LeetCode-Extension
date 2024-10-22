from django.urls import path
from django.shortcuts import render
from .views import *

urlpatterns = [
    path('input/', lambda request: render(request, 'page1.html')),
    path('output/', lambda request: render(request, 'page2.html')),
    path('', index, name='index'),
    path("heartbeat/", check, name="heartbeat")
]
