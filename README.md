# ManimAI

ManimAI is a web application that uses AI to generate mathematical animations using [Manim](https://www.manim.community/). Simply describe the mathematical concept you want to visualize, and ManimAI will generate a beautiful animation for you - no coding required!

## Features

- 🤖 **AI-Powered Generation**: Describe your desired animation in natural language
- 🎨 **Visual Mathematics**: Create stunning mathematical visualizations
- 💻 **No Coding Required**: Generate Manim animations without writing code
- ⚡ **Instant Results**: Get your animations in seconds
- 🌐 **Web-Based Interface**: Easy-to-use chat interface
- 🎥 **Video Downloads**: Download and share your animations

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [Manim](https://www.manim.community/)
- [Cloudinary](https://cloudinary.com/)

## Project Architecture
![image](https://github.com/user-attachments/assets/8e9bc33e-ca4a-4052-ae47-231fca59d134)


## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Manim Dependencies
- Cloudinary Account
- Google Gemini API Key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/manimai.git
cd manimai
```

2. Install Backend Dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Set up Environment Variables

Backend (.env):
```env
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend (.env):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
uvicorn main:app --reload
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
manimai/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── videos/
│   └── main.py
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    └── public/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Manim Community](https://www.manim.community/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [3Blue1Brown](https://www.3blue1brown.com/) for inspiration