# MongoDB Setup for LLManim

This guide will help you set up MongoDB for the LLManim chat history feature.

## Prerequisites

1. **MongoDB Installation**
   - Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud service)

2. **Python Dependencies**
   - The required packages are already in `requirements.txt`
   - Run: `pip install -r requirements.txt`

## Setup Instructions

### 1. Local MongoDB Setup

#### Option A: Local MongoDB Installation
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

#### Option B: Docker MongoDB
```bash
# Pull and run MongoDB container
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Or with persistent storage
docker run -d --name mongodb -p 27017:27017 -v mongodb_data:/data/db mongo:latest
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=llmanim

# Cloudinary Configuration (already configured)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Gemini API (already configured)
GOOGLE_API_KEY=your_google_api_key
```

### 3. Database Initialization

The database and collections will be created automatically when you first run the application.

### 4. Start the Application

```bash
# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Chat Sessions
- `POST /api/chat/sessions` - Create a new chat session
- `GET /api/chat/sessions` - Get all chat sessions
- `GET /api/chat/sessions/{session_id}` - Get a specific session with messages
- `DELETE /api/chat/sessions/{session_id}` - Delete a session
- `PUT /api/chat/sessions/{session_id}/title` - Update session title

### Video Generation (Updated)
- `POST /api/generate` - Generate video and save to chat history

## Database Schema

### Sessions Collection
```javascript
{
  _id: ObjectId,
  session_id: String,
  user_id: String (optional),
  title: String,
  created_at: Date,
  updated_at: Date,
  message_count: Number
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  session_id: String,
  message_id: String,
  content: String,
  sender: String ("user" | "ai"),
  timestamp: Date,
  animation: {
    cloudinary_url: String,
    cloudinary_public_id: String,
    duration: Number,
    format: String
  },
  metadata: {
    prompt: String,
    generation_time: Number,
    manim_code: String
  }
}
```

## Troubleshooting

### Connection Issues
1. **MongoDB not running**: Start MongoDB service
2. **Wrong port**: Check if MongoDB is running on port 27017
3. **Authentication**: If using MongoDB Atlas, use the connection string with username/password

### Common Errors
- `Connection refused`: MongoDB service not running
- `Authentication failed`: Check credentials in connection string
- `Database not found`: Database will be created automatically on first use

## Frontend Integration

The frontend has been updated to work with the new session-based system:

1. **Session Management**: Create, load, and delete chat sessions
2. **Message Persistence**: All messages are saved to MongoDB
3. **Video Integration**: Videos are stored in Cloudinary and linked in messages
4. **History View**: Browse and manage previous chat sessions

## Next Steps

1. **User Authentication**: Add user accounts and session ownership
2. **Sharing**: Allow users to share chat sessions
3. **Search**: Add search functionality for messages and animations
4. **Analytics**: Track usage patterns and popular prompts 