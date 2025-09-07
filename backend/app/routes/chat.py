from fastapi import APIRouter, HTTPException
from typing import List

from app.services.chat_service import ChatService
from app.models.chat_models import (
    CreateSessionRequest,
    CreateSessionResponse,
    ChatSessionResponse,
    SessionListResponse,
    MessageResponse
)

router = APIRouter()

@router.post("/sessions", response_model=CreateSessionResponse)
async def create_session(request: CreateSessionRequest):

    try:
        chat_service = ChatService()
        session = await chat_service.create_session(request.title)

        return CreateSessionResponse(
            session_id=session.session_id,
            title=session.title,
            created_at=session.created_at
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions", response_model=SessionListResponse)
async def get_all_sessions():
    try:
        chat_service = ChatService()
        sessions = await chat_service.get_all_sessions()
        session_responses = []
        
        for session in sessions:
            session_responses.append(ChatSessionResponse(
                session_id=session.session_id,
                title=session.title,
                created_at=session.created_at,
                updated_at=session.updated_at,
                message_count=session.message_count,
                messages=[]  
            ))
        
        return SessionListResponse(sessions=session_responses)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions/{session_id}", response_model=ChatSessionResponse)
async def get_session(session_id: str):
    """Get a specific chat session with all messages."""
    try:
        chat_service = ChatService()
        session = await chat_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        messages = await chat_service.get_session_messages(session_id)
        message_responses = []
        
        for message in messages:
            message_responses.append(MessageResponse(
                message_id=message.message_id,
                content=message.content,
                sender=message.sender,
                timestamp=message.timestamp,
                animation=message.animation
            ))
        
        return ChatSessionResponse(
            session_id=session.session_id,
            title=session.title,
            created_at=session.created_at,
            updated_at=session.updated_at,
            message_count=session.message_count,
            messages=message_responses
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """Delete a chat session and all its messages."""
    try:
        chat_service = ChatService()
        success = await chat_service.delete_session(session_id)
        if not success:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"message": "Session deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/sessions/{session_id}/title")
async def update_session_title(session_id: str, title: str):
    """Update the title of a chat session."""
    try:
        chat_service = ChatService()
        success = await chat_service.update_session_title(session_id, title)
        if not success:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"message": "Title updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/cleanup")
async def cleanup_database():
    """Clean up problematic null _id entries."""
    try:
        chat_service = ChatService()
        sessions_deleted = await chat_service.sessions_collection.delete_many({"_id": None})
        messages_deleted = await chat_service.messages_collection.delete_many({"_id": None})
        
        return {
            "message": "Database cleaned up successfully",
            "sessions_deleted": sessions_deleted.deleted_count,
            "messages_deleted": messages_deleted.deleted_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
