"""
Alternative runner script for the AI Tutor Backend
Use this if you want more control over the server configuration
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

if __name__ == "__main__":
    # Get configuration from environment variables
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    print(f"🚀 Starting AI Tutor Backend on {host}:{port}")
    print(f"📚 API Documentation: http://{host}:{port}/docs")
    print(f"🔧 Health Check: http://{host}:{port}/health")
    
    # Run the server
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )