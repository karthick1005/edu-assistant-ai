# AI Tutor Backend - FastAPI

This is the Python FastAPI backend for the AI Tutor application that handles PDF uploads, document processing, and AI-powered question answering.

## Features

- **PDF Upload**: Upload NCERT and Samacheer Kalvi syllabus PDFs
- **Document Processing**: Extract and process text from PDFs using PyPDF2
- **Vector Search**: Use FAISS for similarity search in documents
- **AI Q&A**: OpenAI GPT integration for natural language responses
- **Quiz Mode**: Generate follow-up questions automatically
- **CORS Support**: Ready to connect with React frontend

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set OpenAI API Key

Create a `.env` file in the backend directory:

```bash
echo "OPENAI_API_KEY=your-actual-openai-api-key" > .env
```

Or set it as an environment variable:

```bash
export OPENAI_API_KEY=your-actual-openai-api-key
```

### 3. Run the Server

```bash
python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### 1. Upload PDF
- **URL**: `POST /upload-pdf/`
- **Body**: Form data with PDF file and syllabus type
- **Example**:
  ```bash
  curl -X POST "http://localhost:8000/upload-pdf/" \
    -F "file=@ncert-math.pdf" \
    -F "syllabus=ncert"
  ```

### 2. Ask Question
- **URL**: `POST /ask-question/`
- **Body**: JSON with question, syllabus, and quiz_mode
- **Example**:
  ```bash
  curl -X POST "http://localhost:8000/ask-question/" \
    -H "Content-Type: application/json" \
    -d '{
      "question": "What is photosynthesis?",
      "syllabus": "ncert",
      "quiz_mode": true
    }'
  ```

### 3. Check Status
- **URL**: `GET /status/{syllabus}`
- **Example**: `GET /status/ncert`

### 4. Health Check
- **URL**: `GET /health`

## Testing the Backend

1. **Start the server**: `python main.py`
2. **Visit docs**: `http://localhost:8000/docs` (FastAPI auto-generated docs)
3. **Upload a PDF**: Use the `/upload-pdf/` endpoint
4. **Ask questions**: Use the `/ask-question/` endpoint

## Integration with Frontend

The backend is configured to work with your Lovable frontend:

- CORS is enabled for `localhost:5173` and `localhost:3000`
- All endpoints return JSON responses compatible with the frontend
- File uploads handle multipart form data
- Error handling provides meaningful messages

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 8000)

## Troubleshooting

1. **Import Errors**: Make sure all dependencies are installed
2. **OpenAI Errors**: Verify your API key is set correctly
3. **PDF Processing Errors**: Ensure PDFs contain extractable text
4. **CORS Errors**: Check that frontend URL is in CORS origins

## Production Deployment

For production deployment:

1. Set environment variables properly
2. Use a production WSGI server like Gunicorn
3. Configure proper CORS origins
4. Add authentication if needed
5. Set up proper logging and monitoring