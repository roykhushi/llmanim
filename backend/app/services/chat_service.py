from datetime import datetime
import uuid
from typing import List, Optional
from bson import ObjectId

from app.lib.database import get_database
from app.models.chat_models import (
    ChatSessionModel, 
    MessageModel, 
    AnimationModel,
    MessageMetadata
)

class ChatService:
    def __init__(self):
        self.db = get_database()
        self.sessions_collection = self.db.sessions
        self.messages_collection = self.db.messages

    async def create_session(self, title: Optional[str] = None) -> ChatSessionModel:
        """Create a new chat session."""
        session_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        if not title:
            title = f"Chat Session {now.strftime('%Y-%m-%d %H:%M')}"
        
        session = ChatSessionModel(
            session_id=session_id,
            title=title,
            created_at=now,
            updated_at=now,
            message_count=0
        )
        session_dict = session.dict(by_alias=True)
        if session_dict.get('_id') is None:
            session_dict['_id'] = str(ObjectId())
        await self.sessions_collection.insert_one(session_dict)
        
        return session

    async def get_session(self, session_id: str) -> Optional[ChatSessionModel]:
   
        session_dict = await self.sessions_collection.find_one({"session_id": session_id})
        if session_dict:
            return ChatSessionModel(**session_dict)
        return None

    async def get_all_sessions(self) -> List[ChatSessionModel]:
    
        sessions = []
        cursor = self.sessions_collection.find().sort("updated_at", -1)
        async for session_dict in cursor:
            sessions.append(ChatSessionModel(**session_dict))
        return sessions

    async def add_message(
        self, 
        session_id: str, 
        message_id: str,
        content: str, 
        sender: str,
        animation: Optional[AnimationModel] = None,
        metadata: Optional[MessageMetadata] = None
    ) -> MessageModel:
       
        message = MessageModel(
            session_id=session_id,
            message_id=message_id,
            content=content,
            sender=sender,
            timestamp=datetime.utcnow(),
            animation=animation,
            metadata=metadata
        )
        
        # Insert message
        message_dict = message.dict(by_alias=True)
        # Ensure _id is not None
        if message_dict.get('_id') is None:
            message_dict['_id'] = str(ObjectId())
        await self.messages_collection.insert_one(message_dict)
        
        # Update session
        update_operations = {
            "$set": {
                "updated_at": datetime.utcnow()
            },
            "$inc": {"message_count": 1}
        }
        
        # Update title if this is the first message
        if sender == "user":
            session = await self.get_session(session_id)
            if session and session.message_count == 0:
                # Use first 50 characters of user message as title
                title = content[:50] + "..." if len(content) > 50 else content
                update_operations["$set"]["title"] = title
        
        await self.sessions_collection.update_one(
            {"session_id": session_id},
            update_operations
        )
        
        return message

    async def get_session_messages(self, session_id: str) -> List[MessageModel]:
     
        messages = []
        cursor = self.messages_collection.find({"session_id": session_id}).sort("timestamp", 1)
        async for message_dict in cursor:
            messages.append(MessageModel(**message_dict))
        return messages

    async def delete_session(self, session_id: str) -> bool:
    
        # Delete messages first
        await self.messages_collection.delete_many({"session_id": session_id})
        
        # Delete session
        result = await self.sessions_collection.delete_one({"session_id": session_id})
        return result.deleted_count > 0

    async def update_session_title(self, session_id: str, title: str) -> bool:
    
        result = await self.sessions_collection.update_one(
            {"session_id": session_id},
            {"$set": {"title": title, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0 