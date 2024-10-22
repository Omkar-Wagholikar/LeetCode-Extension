
# consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer

# Set up logger
logger = logging.getLogger(__name__)
handler = logging.FileHandler('server.log')
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

class StreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract the UUID from the URL route
        self.uuid = self.scope['url_route']['kwargs']['uuid']
        self.group_name = f"stream_group_{self.uuid}"  # Group based on UUID
        
        # Log the UUID and client details
        logger.info(f"Initiating connection for UUID: {self.uuid}, Attributes: {self.__dict__}")

        # Add client to the group based on UUID
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Remove client from the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

        # Log disconnection
        logger.info(f"Client disconnected from group {self.group_name} with code: {close_code}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        # Log received message
        logger.info(f"Received message: {data}")

        # Send message to the group (broadcast to all clients in the same group)
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "broadcast_message",
                "message": message,
            }
        )

    async def broadcast_message(self, event):
        message = event['message']

        # Log broadcast message
        logger.info(f"Broadcasting message: {event}")

        # Send the message to the WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
