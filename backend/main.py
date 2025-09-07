from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes import generate, chat
from app.lib.database import connect_to_mongo, close_mongo_connection
import os

app = FastAPI(title="LLManim API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

videos_path = os.path.join(os.path.dirname(__file__), "videos")
if os.path.exists(videos_path):
    app.mount("/videos", StaticFiles(directory=videos_path), name="videos")

app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.on_event("startup")
async def startup_event():
    try:
        await connect_to_mongo()
    except Exception as e:
        pass

@app.on_event("shutdown")
async def shutdown_event():
    """Close MongoDB connection on shutdown."""
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "LLManim API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
