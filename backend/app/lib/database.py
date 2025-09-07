from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "llmanim")

async_client = None
sync_client = None

async def connect_to_mongo():
    global async_client, sync_client
    
    try:
        async_client = AsyncIOMotorClient(MONGODB_URL)
        sync_client = MongoClient(MONGODB_URL)

        await async_client.admin.command('ping')
        
        return async_client
    except Exception as e:
        raise e

async def close_mongo_connection():
    global async_client, sync_client
    
    if async_client:
        async_client.close()
    if sync_client:
        sync_client.close()
    pass

def get_database():
    if not async_client:
        raise Exception("Database not connected. Call connect_to_mongo() first.")
    return async_client[DATABASE_NAME]

def is_database_connected():
    return async_client is not None
