import asyncio
from websockets.asyncio.server import serve
from json import dumps, loads
from mocker.mocker import mock_users

# from generated.protos import chat_message_pb2 as ChatMessage

clients = []


async def broadcast(websocket, event):
    for client in clients:
        if client != websocket:
            await client.send(dumps(event))


async def handler(websocket):
    clients.append(websocket)
    print("client added", len(clients))
    try:
        while True:
            msg = await websocket.recv()
            event = loads(msg)
            await broadcast(websocket, event)
    except:
        pass
    finally:
        clients.remove(websocket)
        print("client removed", len(clients))


async def main():
    asyncio.create_task(mock_users(broadcast))
    async with serve(handler, "", 8001):
        await asyncio.get_running_loop().create_future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
