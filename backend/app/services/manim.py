import os
import subprocess
import re
import uuid

TEMP_SCRIPT_DIR = "videos/scripts"
VIDEO_OUTPUT_DIR = "videos/outputs"

os.makedirs(TEMP_SCRIPT_DIR, exist_ok=True)
os.makedirs(VIDEO_OUTPUT_DIR, exist_ok=True)

def extract_class_name(code):
    """
    Extract the Manim scene class name from the code.
    Returns the first class that inherits from Scene or any scene type.
    """
    scene_patterns = [
        r'class\s+(\w+)\s*\(\s*Scene\s*\)',  # class MyScene(Scene)
        r'class\s+(\w+)\s*\(\s*MovingCameraScene\s*\)',  # class MyScene(MovingCameraScene)
        r'class\s+(\w+)\s*\(\s*ThreeDScene\s*\)',  # class MyScene(ThreeDScene)
        r'class\s+(\w+)\s*\(\s*GraphScene\s*\)',  # class MyScene(GraphScene)
        r'class\s+(\w+)\s*\(\s*VectorScene\s*\)',  # class MyScene(VectorScene)
        r'class\s+(\w+)\s*\(\s*ZoomedScene\s*\)'  # class MyScene(ZoomedScene)
    ]
    
    for pattern in scene_patterns:
        matches = re.findall(pattern, code)
        if matches:
            return matches[0]
    
    general_pattern = r'class\s+(\w+)\s*\(\s*\w*Scene\w*\s*\)'
    matches = re.findall(general_pattern, code)
    if matches:
        return matches[0]
    
    any_class = re.findall(r'class\s+(\w+)', code)
    if any_class:
        return any_class[0]
        
    raise ValueError("Could not extract class name from code.")

def save_code_to_file(code: str) -> tuple[str, str]:
    # unique file id
    file_id = str(uuid.uuid4())
    script_path = os.path.join(TEMP_SCRIPT_DIR, f"{file_id}.py")
    
    os.makedirs(TEMP_SCRIPT_DIR, exist_ok=True)

    with open(script_path, "w") as f:
        f.write(code)
    
    return script_path, file_id

def render_manim_video(script_path: str, class_name: str, file_id: str) -> str:
    
    output_path = os.path.join(VIDEO_OUTPUT_DIR, f"Animation.mp4")

    command = [
        "manim", "-pql", script_path, class_name,
        "-o", f"Animation.mp4",
        "--media_dir", VIDEO_OUTPUT_DIR,
        "--verbosity", "DEBUG"  
    ]

    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        raise Exception(f"Manim rendering failed:\n{result.stderr}")

    return output_path


