from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection string
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "llmanim")

# Async client for FastAPI
async_client = None
sync_client = None

async def connect_to_mongo():
    """Create database connection."""
    global async_client, sync_client
    
    try:
        async_client = AsyncIOMotorClient(MONGODB_URL)
        sync_client = MongoClient(MONGODB_URL)
        
        # Test the connection
        await async_client.admin.command('ping')
        
        return async_client
    except Exception as e:
        raise e

async def close_mongo_connection():
    """Close database connection."""
    global async_client, sync_client
    
    if async_client:
        async_client.close()
    if sync_client:
        sync_client.close()
    pass

def get_database():
    """Get database instance."""
    if not async_client:
        raise Exception("Database not connected. Call connect_to_mongo() first.")
    return async_client[DATABASE_NAME]

def is_database_connected():
    """Check if database is connected."""
    return async_client is not None

def get_sync_database():
    """Get synchronous database instance."""
    if not sync_client:
        raise Exception("Database not connected. Call connect_to_mongo() first.")
    return sync_client[DATABASE_NAME] 