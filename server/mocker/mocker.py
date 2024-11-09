import random
import asyncio

from .data import usernames, messages


async def mock_users(broadcast):
    while True:
        random_username = random.choice(usernames)
        random_message = random.choice(messages)
        message = {"username": random_username, "message": random_message}
        await broadcast(None, message)
        random_time = random.uniform(0, 2)
        await asyncio.sleep(random_time)
