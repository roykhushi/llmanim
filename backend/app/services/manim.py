import os
import uuid
import subprocess
import re

TEMP_SCRIPT_DIR = "videos/scripts"
VIDEO_OUTPUT_DIR = "videos/outputs"

os.makedirs(TEMP_SCRIPT_DIR, exist_ok=True)
os.makedirs(VIDEO_OUTPUT_DIR, exist_ok=True)

def extract_class_name(code: str) -> str:
    match = re.search(r"class\s+(\w+)\(Scene\):", code)
    if not match:
        raise ValueError("Could not extract class name from code.")
    return match.group(1)

def save_code_to_file(code: str) -> tuple[str, str]:
    file_id = str(uuid.uuid4())
    script_path = os.path.join(TEMP_SCRIPT_DIR, f"{file_id}.py")

    with open(script_path, "w") as f:
        f.write(code)

    return script_path, file_id

def render_manim_video(script_path: str, class_name: str, file_id: str) -> str:
    output_path = os.path.join(VIDEO_OUTPUT_DIR, f"{file_id}.mp4")

    command = [
        "manim", "-pql", script_path, class_name,
        "-o", f"{file_id}.mp4",
        "--media_dir", VIDEO_OUTPUT_DIR
    ]

    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        raise Exception(f"Manim rendering failed:\n{result.stderr}")

    return output_path
