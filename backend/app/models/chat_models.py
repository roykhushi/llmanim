from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

def validate_object_id(v):
    if v is None or v == "":
        return str(ObjectId())
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str) and ObjectId.is_valid(v):
        return v
    raise ValueError("Invalid ObjectId")

class BaseMongoModel(BaseModel):
    # base model for MongoDB documents with ObjectId handling
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    @field_validator('id', mode='before')
    @classmethod
    def validate_id(cls, v):
        return validate_object_id(v)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class AnimationModel(BaseModel):
    cloudinary_url: str
    cloudinary_public_id: Optional[str] = None
    duration: Optional[float] = None
    format: str = "mp4"

class MessageMetadata(BaseModel):
    prompt: Optional[str] = None
    generation_time: Optional[float] = None
    manim_code: Optional[str] = None

class MessageModel(BaseMongoModel):
    session_id: str
    message_id: str  
    content: str
    sender: str  
    timestamp: datetime
    animation: Optional[AnimationModel] = None
    metadata: Optional[MessageMetadata] = None

class ChatSessionModel(BaseMongoModel):
    session_id: str
    user_id: Optional[str] = None  
    title: str
    created_at: datetime
    updated_at: datetime
    message_count: int = 0


class CreateSessionRequest(BaseModel):
    title: Optional[str] = None

class CreateSessionResponse(BaseModel):
    session_id: str
    title: str
    created_at: datetime

class MessageRequest(BaseModel):
    session_id: str
    content: str

class MessageResponse(BaseModel):
    message_id: str
    content: str
    sender: str
    timestamp: datetime
    animation: Optional[AnimationModel] = None

class ChatSessionResponse(BaseModel):
    session_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    message_count: int
    messages: List[MessageResponse] = []

class SessionListResponse(BaseModel):
    sessions: List[ChatSessionResponse]