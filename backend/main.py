"""
AI Tutor Backend - FastAPI Application
Handles PDF uploads, document processing, and AI-powered Q&A
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import openai
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
import PyPDF2
from io import BytesIO
import uuid
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(title="AI Tutor Backend", version="1.0.0")

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your OpenAI API key here
openai.api_key = os.getenv("OPENAI_API_KEY", "your-openai-api-key-here")

# Global variables to store document stores
document_stores = {
    "ncert": None,
    "samacheer": None
}

# Data models
class QuestionRequest(BaseModel):
    question: str
    syllabus: str  # "ncert" or "samacheer"
    quiz_mode: bool = False

class QuestionResponse(BaseModel):
    answer: str
    quiz_questions: Optional[List[str]] = None
    timestamp: datetime
    syllabus: str

class UploadResponse(BaseModel):
    message: str
    filename: str
    syllabus: str
    pages_processed: int

# Helper functions
def extract_text_from_pdf(pdf_file: bytes) -> str:
    """Extract text from uploaded PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_file))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing PDF: {str(e)}")

def create_vector_store(text: str, syllabus: str):
    """Create vector store from text for similarity search"""
    try:
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(text)
        
        # Create embeddings and vector store
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.from_texts(chunks, embeddings)
        
        # Store in global variable
        document_stores[syllabus] = vector_store
        
        return len(chunks)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating vector store: {str(e)}")

def generate_quiz_questions(answer: str, original_question: str) -> List[str]:
    """Generate follow-up quiz questions based on the answer"""
    try:
        prompt = f"""
        Based on this Q&A exchange, generate 2 follow-up quiz questions that test understanding:
        
        Original Question: {original_question}
        Answer: {answer}
        
        Generate 2 quiz questions that:
        1. Test comprehension of the answer
        2. Ask for practical application
        
        Format as a numbered list:
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.7
        )
        
        quiz_text = response.choices[0].message.content.strip()
        # Parse the numbered list into individual questions
        questions = [q.strip() for q in quiz_text.split('\n') if q.strip() and any(char.isdigit() for char in q[:3])]
        return questions[:2]  # Return max 2 questions
        
    except Exception as e:
        print(f"Error generating quiz questions: {e}")
        return []

# API Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "AI Tutor Backend is running!", "status": "healthy"}

@app.post("/upload-pdf/", response_model=UploadResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    syllabus: str = "ncert"
):
    """
    Upload and process PDF files for NCERT or Samacheer Kalvi syllabus
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Validate syllabus
    if syllabus not in ["ncert", "samacheer"]:
        raise HTTPException(status_code=400, detail="Syllabus must be 'ncert' or 'samacheer'")
    
    try:
        # Read PDF content
        content = await file.read()
        
        # Extract text from PDF
        text = extract_text_from_pdf(content)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in PDF")
        
        # Create vector store for similarity search
        chunks_processed = create_vector_store(text, syllabus)
        
        return UploadResponse(
            message=f"Successfully processed PDF for {syllabus.upper()} syllabus",
            filename=file.filename,
            syllabus=syllabus,
            pages_processed=chunks_processed
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/ask-question/", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """
    Answer student questions based on uploaded PDFs and selected syllabus
    """
    # Validate syllabus
    if request.syllabus not in ["ncert", "samacheer"]:
        raise HTTPException(status_code=400, detail="Syllabus must be 'ncert' or 'samacheer'")
    
    # Check if documents are uploaded for the selected syllabus
    if document_stores[request.syllabus] is None:
        raise HTTPException(
            status_code=400, 
            detail=f"No documents uploaded for {request.syllabus.upper()} syllabus. Please upload PDFs first."
        )
    
    try:
        # Create retrieval QA chain
        llm = OpenAI(temperature=0.7, max_tokens=500)
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=document_stores[request.syllabus].as_retriever(search_kwargs={"k": 3}),
            return_source_documents=False
        )
        
        # Enhanced prompt for better answers
        enhanced_question = f"""
        Based on the {request.syllabus.upper()} syllabus content, please answer this question:
        
        {request.question}
        
        Please provide a clear, educational answer that:
        1. Directly addresses the question
        2. Uses simple language appropriate for students
        3. Includes relevant examples when possible
        4. References the syllabus content when applicable
        """
        
        # Get answer from the QA chain
        result = qa_chain.run(enhanced_question)
        
        # Generate quiz questions if quiz mode is enabled
        quiz_questions = []
        if request.quiz_mode:
            quiz_questions = generate_quiz_questions(result, request.question)
        
        return QuestionResponse(
            answer=result,
            quiz_questions=quiz_questions if quiz_questions else None,
            timestamp=datetime.now(),
            syllabus=request.syllabus
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

@app.get("/status/{syllabus}")
async def get_syllabus_status(syllabus: str):
    """Check if documents are uploaded for a specific syllabus"""
    if syllabus not in ["ncert", "samacheer"]:
        raise HTTPException(status_code=400, detail="Syllabus must be 'ncert' or 'samacheer'")
    
    is_ready = document_stores[syllabus] is not None
    
    return {
        "syllabus": syllabus.upper(),
        "documents_uploaded": is_ready,
        "status": "ready" if is_ready else "no_documents"
    }

@app.get("/health")
async def health_check():
    """Detailed health check with system status"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(),
        "ncert_ready": document_stores["ncert"] is not None,
        "samacheer_ready": document_stores["samacheer"] is not None,
        "openai_configured": bool(openai.api_key and openai.api_key != "your-openai-api-key-here")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)