import cloudinary.uploader
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import re
import uuid

from app.models.schema import PromptRequest
from app.services.gemini import get_manim_code_from_prompt
from app.services.manim import extract_class_name, save_code_to_file, render_manim_video
from app.services.chat_service import ChatService
from app.models.chat_models import AnimationModel, MessageMetadata
from app.lib.database import is_database_connected

import time
import cloudinary
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET")
)

router = APIRouter()

def clean_code(code):
    """
    Clean the code to remove non-Python elements while preserving
    important structures like class definitions.
    """
    code_block_pattern = r'```(?:python)?\s*(.*?)\s*```'
    code_blocks = re.findall(code_block_pattern, code, re.DOTALL)
    
    if code_blocks:
        cleaned_code = max(code_blocks, key=len)
    else:
        lines = code.split('\n')
        cleaned_lines = []
        
        for line in lines:
            if re.match(r'^\d+\.\s+\*\*', line.strip()):
                continue
                
            if line.strip().startswith(('# ', '## ', '### ')) and ':' in line:
                continue
                
            line = re.sub(r'\*\*(.*?)\*\*', r'\1', line)  
            line = re.sub(r'`(.*?)`', r'\1', line)        
            
            cleaned_lines.append(line)
            
        cleaned_code = '\n'.join(cleaned_lines)
    
    if "from manim import" not in cleaned_code:
        cleaned_code = "from manim import *\n" + cleaned_code
    
    if not re.search(r'class\s+\w+\s*\(\s*\w*Scene\w*\s*\)', cleaned_code):
        cleaned_code += '\n\nclass DefaultScene(Scene):\n    def construct(self):\n        self.add(Text("Default Scene"))\n'
    
    return cleaned_code




@router.post("/generate")
async def generate_video(request: PromptRequest):

    try:
        start_time = time.time()
        session_id = request.session_id
        user_message_id = str(uuid.uuid4())
        ai_message_id = str(uuid.uuid4())
        

        
        if is_database_connected():
            try:
                chat_service = ChatService()
                if not session_id:
                    session = await chat_service.create_session("New Animation Chat")
                    session_id = session.session_id
                
                await chat_service.add_message(
                    session_id=session_id,
                    message_id=user_message_id,
                    content=request.prompt,
                    sender="user"
                )
            except Exception as e:
                session_id = None

        enhanced_prompt = (
            f"{request.prompt}\n\n"
            "Generate ONLY valid Python code for a Manim animation. "
            "The code must include a class that inherits from Scene (or a Scene subclass like ThreeDScene). "
            "Include all necessary imports. "
            "Do not include explanations, markdown formatting, or installation instructions. "
            "The output should be directly executable as a Python file."
        )
        raw_code = get_manim_code_from_prompt(enhanced_prompt)
        code = clean_code(raw_code)
        class_name = extract_class_name(code)
        script_path, file_id = save_code_to_file(code)
        video_path = render_manim_video(script_path, class_name,file_id)
        
        documentUrl = ""
        cloudinary_public_id = None
        file = f"videos/outputs/videos/0/480p15/Animation.mp4"
        if file:
            object_key = str(time.time()) + "/"+ file
            upload_result = cloudinary.uploader.upload(file, public_id=object_key, resource_type="video")
            documentUrl = upload_result["secure_url"]
            cloudinary_public_id = upload_result["public_id"]
        
        generation_time = time.time() - start_time
        
        animation = AnimationModel(
            cloudinary_url=documentUrl,
            cloudinary_public_id=cloudinary_public_id,
            duration=None, 
            format="mp4"
        )
        
        metadata = MessageMetadata(
            prompt=request.prompt,
            generation_time=generation_time,
            manim_code=code
        )
        
        if is_database_connected() and session_id:
            try:
                await chat_service.add_message(
                    session_id=session_id,
                    message_id=ai_message_id,
                    content="I've created an animation based on your request!",
                    sender="ai",
                    animation=animation,
                    metadata=metadata
                )
            except Exception as e:
                pass
        

        
        return JSONResponse({
            "video_url": documentUrl,
            "session_id": session_id,
            "message_id": ai_message_id,
            "generation_time": generation_time
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




