from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uvicorn
from datetime import datetime

app = FastAPI(
    title="MonoRepo Backend API",
    description="FastAPI backend for the monorepo project",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: EmailStr
    created_at: Optional[datetime] = None

class UserCreate(BaseModel):
    name: str
    email: EmailStr

# In-memory storage (replace with database in production)
users_db: List[User] = []
user_id_counter = 1

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "MonoRepo Backend API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/users", response_model=List[User])
async def get_users():
    """Get all users"""
    return users_db

@app.post("/api/users", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    global user_id_counter
    
    # Check if email already exists
    for existing_user in users_db:
        if existing_user.email == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        id=user_id_counter,
        name=user.name,
        email=user.email,
        created_at=datetime.now()
    )
    
    users_db.append(new_user)
    user_id_counter += 1
    
    return new_user

@app.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    for user in users_db:
        if user.id == user_id:
            return user
    
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int):
    """Delete a user by ID"""
    for i, user in enumerate(users_db):
        if user.id == user_id:
            deleted_user = users_db.pop(i)
            return {"message": f"User {deleted_user.name} deleted successfully"}
    
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/api/shared/validate-email/{email}")
async def validate_email_endpoint(email: str):
    """Validate email format (shared utility endpoint)"""
    # Simple email validation
    import re
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    is_valid = bool(re.match(email_pattern, email))
    
    return {
        "email": email,
        "is_valid": is_valid
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
