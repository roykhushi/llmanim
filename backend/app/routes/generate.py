from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import re

from app.models.schema import PromptRequest
from app.services.gemini import get_manim_code_from_prompt
from app.services.manim import extract_class_name, save_code_to_file, render_manim_video

router = APIRouter()



def clean_code(code):
    """
    Clean the code to remove non-Python elements while preserving
    important structures like class definitions.
    """
    # First, try to extract code from code blocks if they exist
    code_block_pattern = r'```(?:python)?\s*(.*?)\s*```'
    code_blocks = re.findall(code_block_pattern, code, re.DOTALL)
    
    if code_blocks:
        # Use the largest code block (likely the main script)
        cleaned_code = max(code_blocks, key=len)
    else:
        # If no code blocks, clean line by line
        lines = code.split('\n')
        cleaned_lines = []
        
        # Process each line
        for line in lines:
            # Skip markdown list items that aren't valid Python
            if re.match(r'^\d+\.\s+\*\*', line.strip()):
                continue
                
            # Skip lines that are clearly markdown or instructions
            if line.strip().startswith(('# ', '## ', '### ')) and ':' in line:
                continue
                
            # Remove markdown formatting but keep the content
            line = re.sub(r'\*\*(.*?)\*\*', r'\1', line)  # Remove bold
            line = re.sub(r'`(.*?)`', r'\1', line)        # Remove inline code
            
            cleaned_lines.append(line)
            
        cleaned_code = '\n'.join(cleaned_lines)
    
    # Ensure imports for Manim are present
    if "from manim import" not in cleaned_code:
        cleaned_code = "from manim import *\n" + cleaned_code
    
    # Ensure there's at least one simple Scene class if none was found
    if not re.search(r'class\s+\w+\s*\(\s*\w*Scene\w*\s*\)', cleaned_code):
        cleaned_code += '\n\nclass DefaultScene(Scene):\n    def construct(self):\n        self.add(Text("Default Scene"))\n'
    
    return cleaned_code




@router.post("/generate")
async def generate_video(request: PromptRequest):
    try:

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
        video_path = render_manim_video(script_path, class_name, file_id)
        
        return FileResponse(path=video_path, media_type="video/mp4", filename=f"{file_id}.mp4")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
