# asgi.py

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path, re_path
from channels.auth import AuthMiddlewareStack
from soc_app import consumers
from django.core.asgi import get_asgi_application
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'channel_test.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # Define URL pattern to include UUID
            re_path(r'ws/stream/(?P<uuid>[a-f0-9\-]+)/$', consumers.StreamConsumer.as_asgi()),  # Match the UUID format in the URL
        ])
    ),
})
