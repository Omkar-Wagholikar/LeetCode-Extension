# myapp/routing.py
from django.urls import path
from .consumers import TextStreamConsumer

websocket_urlpatterns = [
    path('ws/text-stream/', TextStreamConsumer.as_asgi()),
]
