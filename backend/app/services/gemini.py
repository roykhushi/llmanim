import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

# def get_manim_code_from_prompt(prompt: str) -> str:
#     response = model.generate_content(prompt)
#     return response.text


def get_manim_code_from_prompt(prompt):
    """Get Manim code from Gemini based on the prompt."""
    try:
        # Adding instructions to get proper Manim scene code
        enhanced_prompt = (
            f"{prompt}\n\n"
            "Generate valid Python code for a Manim animation. "
            "The code must define a class that inherits from Scene or a Scene subclass. "
            "Include all necessary imports like 'from manim import *'. "
            "The class must have a construct method. "
            "Provide only the executable Python code with no explanations or markdown."
        )
        
        # Call Gemini API
        response = model.generate_content(enhanced_prompt)
        
        return response.text
    except Exception as e:
        raise Exception(f"Error getting code from Gemini: {str(e)}")