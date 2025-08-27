from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import uvicorn
import asyncio
import hashlib
import secrets
import jwt
import bcrypt
from datetime import datetime, timedelta
import re
import os

app = FastAPI(
    title="MonoRepo Backend API",
    description="Comprehensive REST API for authentication, data, AI processing, business logic, and user management",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ============================================================================
# Pydantic Models for API
# ============================================================================

class UserRegister(BaseModel):
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    role: str
    is_active: bool
    created_at: datetime

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_image_url: Optional[str] = None

class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    bio: Optional[str]
    preferences: Dict[str, Any]
    metadata: Dict[str, Any]
    created_at: datetime

class UserProfileUpdate(BaseModel):
    bio: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None

class AITaskCreate(BaseModel):
    task_type: str  # 'text_analysis', 'image_processing', 'sentiment_analysis', 'content_generation'
    input_data: Dict[str, Any]

class AITaskResponse(BaseModel):
    id: str
    user_id: str
    task_type: str
    status: str
    input_data: Dict[str, Any]
    output_data: Optional[Dict[str, Any]]
    error_message: Optional[str]
    processing_time: Optional[int]
    created_at: datetime

class BusinessEntityCreate(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

class BusinessEntityResponse(BaseModel):
    id: str
    owner_id: str
    name: str
    description: Optional[str]
    category: Optional[str]
    data: Dict[str, Any]
    is_active: bool
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
    timestamp: datetime

# ============================================================================
# In-Memory Database (Replace with real database in production)
# ============================================================================

# Storage
users_db: Dict[str, dict] = {}
user_profiles_db: Dict[str, dict] = {}
ai_tasks_db: Dict[str, dict] = {}
business_entities_db: Dict[str, dict] = {}
audit_logs_db: List[dict] = []

# ============================================================================
# Authentication & Security Utilities
# ============================================================================

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token and return user ID"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(user_id: str = Depends(verify_token)):
    """Get current authenticated user"""
    user = users_db.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def log_audit(action: str, user_id: Optional[str] = None, resource_type: Optional[str] = None, 
              resource_id: Optional[str] = None, metadata: Optional[Dict] = None, 
              request: Optional[Request] = None):
    """Log user actions for audit"""
    audit_entry = {
        "id": secrets.token_urlsafe(16),
        "user_id": user_id,
        "action": action,
        "resource_type": resource_type,
        "resource_id": resource_id,
        "metadata": metadata or {},
        "ip_address": request.client.host if request else None,
        "user_agent": request.headers.get("user-agent") if request else None,
        "created_at": datetime.utcnow().isoformat()
    }
    audit_logs_db.append(audit_entry)

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.post("/api/auth/register", response_model=APIResponse)
async def register_user(user_data: UserRegister, request: Request):
    """Register a new user"""
    # Check if user already exists
    for user in users_db.values():
        if user["email"] == user_data.email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_id = secrets.token_urlsafe(16)
    hashed_password = hash_password(user_data.password)
    
    new_user = {
        "id": user_id,
        "email": user_data.email,
        "password_hash": hashed_password,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "role": "user",
        "is_active": True,
        "last_login_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    users_db[user_id] = new_user
    
    # Create user profile
    profile_id = secrets.token_urlsafe(16)
    user_profiles_db[profile_id] = {
        "id": profile_id,
        "user_id": user_id,
        "bio": None,
        "preferences": {},
        "metadata": {},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    log_audit("user_registered", user_id, "user", user_id, {"email": user_data.email}, request)
    
    return APIResponse(
        success=True,
        message="User registered successfully",
        data={"user_id": user_id},
        timestamp=datetime.utcnow()
    )

@app.post("/api/auth/login", response_model=Token)
async def login_user(user_data: UserLogin, request: Request):
    """Authenticate user and return access token"""
    # Find user by email
    user = None
    for u in users_db.values():
        if u["email"] == user_data.email:
            user = u
            break
    
    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated"
        )
    
    # Update last login
    user["last_login_at"] = datetime.utcnow()
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"], "role": user["role"]}, 
        expires_delta=access_token_expires
    )
    
    log_audit("user_login", user["id"], "user", user["id"], {"email": user_data.email}, request)
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current authenticated user information"""
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        role=current_user["role"],
        is_active=current_user["is_active"],
        created_at=current_user["created_at"]
    )

# ============================================================================
# USER MANAGEMENT ENDPOINTS
# ============================================================================

@app.get("/api/users", response_model=List[UserResponse])
async def list_users(current_user: dict = Depends(get_current_user)):
    """List all users (admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return [
        UserResponse(
            id=user["id"],
            email=user["email"],
            first_name=user["first_name"],
            last_name=user["last_name"],
            role=user["role"],
            is_active=user["is_active"],
            created_at=user["created_at"]
        )
        for user in users_db.values()
    ]

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """Get user by ID"""
    if current_user["id"] != user_id and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=user["id"],
        email=user["email"],
        first_name=user["first_name"],
        last_name=user["last_name"],
        role=user["role"],
        is_active=user["is_active"],
        created_at=user["created_at"]
    )

@app.put("/api/users/{user_id}", response_model=APIResponse)
async def update_user(user_id: str, user_data: UserUpdate, request: Request, 
                     current_user: dict = Depends(get_current_user)):
    """Update user information"""
    if current_user["id"] != user_id and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user data
    if user_data.first_name is not None:
        user["first_name"] = user_data.first_name
    if user_data.last_name is not None:
        user["last_name"] = user_data.last_name
    if user_data.profile_image_url is not None:
        user["profile_image_url"] = user_data.profile_image_url
    
    user["updated_at"] = datetime.utcnow()
    
    log_audit("user_updated", current_user["id"], "user", user_id, 
             {"updated_fields": user_data.dict(exclude_unset=True)}, request)
    
    return APIResponse(
        success=True,
        message="User updated successfully",
        timestamp=datetime.utcnow()
    )

# ============================================================================
# USER PROFILE ENDPOINTS
# ============================================================================

@app.get("/api/users/{user_id}/profile", response_model=UserProfileResponse)
async def get_user_profile(user_id: str, current_user: dict = Depends(get_current_user)):
    """Get user profile"""
    if current_user["id"] != user_id and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    profile = None
    for p in user_profiles_db.values():
        if p["user_id"] == user_id:
            profile = p
            break
    
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    
    return UserProfileResponse(
        id=profile["id"],
        user_id=profile["user_id"],
        bio=profile["bio"],
        preferences=profile["preferences"],
        metadata=profile["metadata"],
        created_at=profile["created_at"]
    )

@app.put("/api/users/{user_id}/profile", response_model=APIResponse)
async def update_user_profile(user_id: str, profile_data: UserProfileUpdate, request: Request,
                             current_user: dict = Depends(get_current_user)):
    """Update user profile"""
    if current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    profile = None
    for p in user_profiles_db.values():
        if p["user_id"] == user_id:
            profile = p
            break
    
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    
    # Update profile data
    if profile_data.bio is not None:
        profile["bio"] = profile_data.bio
    if profile_data.preferences is not None:
        profile["preferences"].update(profile_data.preferences)
    if profile_data.metadata is not None:
        profile["metadata"].update(profile_data.metadata)
    
    profile["updated_at"] = datetime.utcnow()
    
    log_audit("profile_updated", current_user["id"], "profile", profile["id"], 
             {"updated_fields": profile_data.dict(exclude_unset=True)}, request)
    
    return APIResponse(
        success=True,
        message="Profile updated successfully",
        timestamp=datetime.utcnow()
    )

# ============================================================================
# AI PROCESSING ENDPOINTS
# ============================================================================

async def process_ai_task(task: dict):
    """Simulate AI processing"""
    start_time = datetime.utcnow()
    
    try:
        task_type = task["task_type"]
        input_data = task["input_data"]
        
        # Simulate processing time
        await asyncio.sleep(1)
        
        # Mock AI responses based on task type
        if task_type == "text_analysis":
            output_data = {
                "word_count": len(input_data.get("text", "").split()),
                "sentiment": "positive",
                "confidence": 0.85,
                "keywords": ["example", "text", "analysis"]
            }
        elif task_type == "sentiment_analysis":
            output_data = {
                "sentiment": "positive",
                "score": 0.75,
                "confidence": 0.89
            }
        elif task_type == "content_generation":
            output_data = {
                "generated_content": f"Generated content based on: {input_data.get('prompt', 'default prompt')}",
                "word_count": 150
            }
        else:
            output_data = {"result": "Task completed successfully"}
        
        # Update task
        processing_time = int((datetime.utcnow() - start_time).total_seconds() * 1000)
        task.update({
            "status": "completed",
            "output_data": output_data,
            "processing_time": processing_time,
            "updated_at": datetime.utcnow()
        })
        
    except Exception as e:
        task.update({
            "status": "failed",
            "error_message": str(e),
            "updated_at": datetime.utcnow()
        })

@app.post("/api/ai/tasks", response_model=APIResponse)
async def create_ai_task(task_data: AITaskCreate, request: Request,
                        current_user: dict = Depends(get_current_user)):
    """Create and process AI task"""
    task_id = secrets.token_urlsafe(16)
    
    task = {
        "id": task_id,
        "user_id": current_user["id"],
        "task_type": task_data.task_type,
        "status": "processing",
        "input_data": task_data.input_data,
        "output_data": None,
        "error_message": None,
        "processing_time": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    ai_tasks_db[task_id] = task
    
    # Process task asynchronously
    asyncio.create_task(process_ai_task(task))
    
    log_audit("ai_task_created", current_user["id"], "ai_task", task_id, 
             {"task_type": task_data.task_type}, request)
    
    return APIResponse(
        success=True,
        message="AI task created and processing",
        data={"task_id": task_id},
        timestamp=datetime.utcnow()
    )

@app.get("/api/ai/tasks", response_model=List[AITaskResponse])
async def list_ai_tasks(current_user: dict = Depends(get_current_user)):
    """List user's AI tasks"""
    user_tasks = [
        task for task in ai_tasks_db.values() 
        if task["user_id"] == current_user["id"]
    ]
    
    return [
        AITaskResponse(
            id=task["id"],
            user_id=task["user_id"],
            task_type=task["task_type"],
            status=task["status"],
            input_data=task["input_data"],
            output_data=task["output_data"],
            error_message=task["error_message"],
            processing_time=task["processing_time"],
            created_at=task["created_at"]
        )
        for task in user_tasks
    ]

@app.get("/api/ai/tasks/{task_id}", response_model=AITaskResponse)
async def get_ai_task(task_id: str, current_user: dict = Depends(get_current_user)):
    """Get AI task by ID"""
    task = ai_tasks_db.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task["user_id"] != current_user["id"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return AITaskResponse(
        id=task["id"],
        user_id=task["user_id"],
        task_type=task["task_type"],
        status=task["status"],
        input_data=task["input_data"],
        output_data=task["output_data"],
        error_message=task["error_message"],
        processing_time=task["processing_time"],
        created_at=task["created_at"]
    )

# ============================================================================
# BUSINESS ENTITY ENDPOINTS
# ============================================================================

@app.post("/api/business/entities", response_model=APIResponse)
async def create_business_entity(entity_data: BusinessEntityCreate, request: Request,
                                current_user: dict = Depends(get_current_user)):
    """Create business entity"""
    entity_id = secrets.token_urlsafe(16)
    
    entity = {
        "id": entity_id,
        "owner_id": current_user["id"],
        "name": entity_data.name,
        "description": entity_data.description,
        "category": entity_data.category,
        "data": entity_data.data or {},
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    business_entities_db[entity_id] = entity
    
    log_audit("business_entity_created", current_user["id"], "business_entity", entity_id, 
             {"name": entity_data.name}, request)
    
    return APIResponse(
        success=True,
        message="Business entity created successfully",
        data={"entity_id": entity_id},
        timestamp=datetime.utcnow()
    )

@app.get("/api/business/entities", response_model=List[BusinessEntityResponse])
async def list_business_entities(current_user: dict = Depends(get_current_user)):
    """List user's business entities"""
    user_entities = [
        entity for entity in business_entities_db.values() 
        if entity["owner_id"] == current_user["id"]
    ]
    
    return [
        BusinessEntityResponse(
            id=entity["id"],
            owner_id=entity["owner_id"],
            name=entity["name"],
            description=entity["description"],
            category=entity["category"],
            data=entity["data"],
            is_active=entity["is_active"],
            created_at=entity["created_at"]
        )
        for entity in user_entities
    ]

@app.get("/api/business/entities/{entity_id}", response_model=BusinessEntityResponse)
async def get_business_entity(entity_id: str, current_user: dict = Depends(get_current_user)):
    """Get business entity by ID"""
    entity = business_entities_db.get(entity_id)
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    
    if entity["owner_id"] != current_user["id"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return BusinessEntityResponse(
        id=entity["id"],
        owner_id=entity["owner_id"],
        name=entity["name"],
        description=entity["description"],
        category=entity["category"],
        data=entity["data"],
        is_active=entity["is_active"],
        created_at=entity["created_at"]
    )

# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "message": "MonoRepo Backend API v2.0",
        "description": "Comprehensive REST API for authentication, data, AI processing, business logic, and user management",
        "version": "2.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "authentication": "/api/auth/*",
            "users": "/api/users/*", 
            "ai_processing": "/api/ai/*",
            "business": "/api/business/*",
            "utilities": "/api/utils/*"
        }
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "2.0.0",
        "database": "connected",
        "services": {
            "auth": "active",
            "ai_processing": "active", 
            "business_logic": "active"
        }
    }

@app.get("/api/utils/validate-email/{email}")
async def validate_email_endpoint(email: str):
    """Validate email format"""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    is_valid = bool(re.match(email_pattern, email))
    
    return {
        "email": email,
        "is_valid": is_valid,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/stats", response_model=APIResponse)
async def get_api_stats(current_user: dict = Depends(get_current_user)):
    """Get API usage statistics"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    stats = {
        "total_users": len(users_db),
        "active_users": len([u for u in users_db.values() if u["is_active"]]),
        "total_ai_tasks": len(ai_tasks_db),
        "completed_ai_tasks": len([t for t in ai_tasks_db.values() if t["status"] == "completed"]),
        "total_business_entities": len(business_entities_db),
        "total_audit_logs": len(audit_logs_db)
    }
    
    return APIResponse(
        success=True,
        message="API statistics retrieved",
        data=stats,
        timestamp=datetime.utcnow()
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
