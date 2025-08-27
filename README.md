# ManimAI

ManimAI is a web application that uses AI to generate mathematical animations using [Manim](https://www.manim.community/). Simply describe the mathematical concept you want to visualize, and ManimAI will generate a beautiful animation for you - no coding required!

## Features

- 🤖 **AI-Powered Generation**: Describe your desired animation in natural language
- 🎨 **Visual Mathematics**: Create stunning mathematical visualizations
- 💻 **No Coding Required**: Generate Manim animations without writing code
- ⚡ **Instant Results**: Get your animations in seconds
- 💬 **Interactive Chat Interface**: Conversational AI for creating animations
- 📚 **Chat History & Sessions**: Save and manage multiple conversation sessions
- 🎥 **Video Downloads**: Download animations as MP4 or GIF formats
- 🌙 **Dark/Light Mode**: Toggle between themes for comfortable viewing
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ☁️ **Cloud Storage**: Animations stored securely with Cloudinary CDN

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
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud database for chat persistence)
- [Motor](https://motor.readthedocs.io/) (Async MongoDB driver)

## Project Architecture
![image](https://github.com/user-attachments/assets/8e9bc33e-ca4a-4052-ae47-231fca59d134)

## Chat Interface
<img width="1897" height="822" alt="Screenshot 2025-08-26 231927" src="https://github.com/user-attachments/assets/ea303982-289b-429a-9ea4-1ebd12fb6e46" />



## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Manim Dependencies
- Cloudinary Account
- Google Gemini API Key
- MongoDB Atlas

### Installation

1. Clone the repository
```bash
git clone https://github.com/roykhushi/llmanim.git
cd llmanim
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
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=llmanim
```

Frontend (.env):
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Running the Application

1. Set up MongoDB Atlas
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string and update the `MONGODB_URL` in your `.env` file
   - Make sure to whitelist your IP address in the Atlas dashboard

2. Start the Backend Server
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
fastapi dev main.py
```

3. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Chat Interface
- Navigate to `/chat` to access the interactive chat interface
- Create new chat sessions or continue previous conversations
- Type your mathematical animation requests in natural language
- Download generated animations in MP4 or GIF format
- View and manage your chat history in the sidebar

### Example Prompts
- "Create an animation showing the quadratic formula derivation"
- "Animate the concept of integration by parts"
- "Show how matrix multiplication works with 2x2 matrices"
- "Visualize the Pythagorean theorem proof"
- "Create an animation of a sine wave transformation"

## API Endpoints

### Animation Generation
- `POST /api/generate` - Generate animation from text prompt

### Chat Management
- `GET /api/chat/sessions` - Get all chat sessions
- `POST /api/chat/sessions` - Create new chat session
- `GET /api/chat/sessions/{session_id}` - Get specific session with messages
- `DELETE /api/chat/sessions/{session_id}` - Delete chat session
- `GET /api/chat/test-db` - Test database connection

## Project Structure

```
llmanim/
├── backend/
│   ├── app/
│   │   ├── lib/
│   │   │   ├── cloudinary.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── chat_models.py
│   │   │   └── schema.py
│   │   ├── routes/
│   │   │   ├── chat.py
│   │   │   └── generate.py
│   │   └── services/
│   │       ├── chat_service.py
│   │       ├── gemini.py
│   │       └── manim.py
│   ├── videos/
│   │   ├── outputs/
│   │   └── scripts/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── chat/
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   ├── ChatInput.tsx
    │   ├── ChatMessage.tsx
    │   ├── ChatSidebar.tsx
    │   └── Navbar.tsx
    ├── lib/
    │   └── utils.ts
    └── public/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Manim Community](https://www.manim.community/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [3Blue1Brown](https://www.3blue1brown.com/) for inspiration
