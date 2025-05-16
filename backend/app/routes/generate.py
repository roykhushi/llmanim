from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.models.schema import PromptRequest
from app.services.gemini import get_manim_code_from_prompt
from app.services.manim import extract_class_name, save_code_to_file, render_manim_video

router = APIRouter()

@router.post("/generate")
async def generate_video(request: PromptRequest):
    try:
        # 1. Get Manim code from Gemini
        code = get_manim_code_from_prompt(request.prompt)

        # 2. Extract class name
        class_name = extract_class_name(code)

        # 3. Save code to file
        script_path, file_id = save_code_to_file(code)

        # 4. Render video using Manim
        video_path = render_manim_video(script_path, class_name, file_id)

        # 5. Return video file
        return FileResponse(path=video_path, media_type="video/mp4", filename=f"{file_id}.mp4")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
