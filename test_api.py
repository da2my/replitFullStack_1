#!/usr/bin/env python3
"""
Quick test script for the FastAPI REST endpoints
"""
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"✅ Health check passed: {response.json()}")
    else:
        print(f"❌ Health check failed: {response.text}")
    return response.status_code == 200

def test_registration_and_login():
    """Test user registration and login"""
    print("\n🔍 Testing user registration...")
    
    # Register a new user
    user_data = {
        "email": f"test_{int(datetime.utcnow().timestamp())}@example.com",
        "password": "testpassword123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/register", json=user_data)
    print(f"Registration status: {response.status_code}")
    
    if response.status_code == 200:
        print(f"✅ Registration successful: {response.json()}")
        
        # Now test login
        print("\n🔍 Testing user login...")
        login_data = {
            "email": user_data["email"],
            "password": user_data["password"]
        }
        
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
        print(f"Login status: {login_response.status_code}")
        
        if login_response.status_code == 200:
            token_data = login_response.json()
            print(f"✅ Login successful, token received")
            return token_data["access_token"]
        else:
            print(f"❌ Login failed: {login_response.text}")
            return None
    else:
        print(f"❌ Registration failed: {response.text}")
        return None

def test_protected_endpoints(token):
    """Test protected endpoints with authentication"""
    if not token:
        print("❌ No token available, skipping protected endpoint tests")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    print("\n🔍 Testing protected endpoint - Get current user...")
    response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        user_info = response.json()
        print(f"✅ Current user info: {user_info}")
        
        # Test AI task creation
        print("\n🔍 Testing AI task creation...")
        ai_task_data = {
            "task_type": "sentiment_analysis",
            "input_data": {"text": "I love this new API system!"}
        }
        
        ai_response = requests.post(f"{BASE_URL}/api/ai/tasks", json=ai_task_data, headers=headers)
        print(f"AI task creation status: {ai_response.status_code}")
        
        if ai_response.status_code == 200:
            task_info = ai_response.json()
            print(f"✅ AI task created: {task_info}")
            
            # Get the task after a brief moment
            task_id = task_info["data"]["task_id"]
            print(f"\n🔍 Checking AI task status for {task_id}...")
            
            import time
            time.sleep(2)  # Wait for processing
            
            task_response = requests.get(f"{BASE_URL}/api/ai/tasks/{task_id}", headers=headers)
            if task_response.status_code == 200:
                task_result = task_response.json()
                print(f"✅ AI task result: {task_result}")
            else:
                print(f"❌ Failed to get task result: {task_response.text}")
        else:
            print(f"❌ AI task creation failed: {ai_response.text}")
    else:
        print(f"❌ Failed to get current user: {response.text}")

def test_business_entity(token):
    """Test business entity endpoints"""
    if not token:
        print("❌ No token available, skipping business entity tests")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    print("\n🔍 Testing business entity creation...")
    entity_data = {
        "name": "Test Business Project",
        "description": "A test business entity for API validation",
        "category": "technology",
        "data": {
            "budget": 25000,
            "team_size": 3,
            "priority": "high"
        }
    }
    
    response = requests.post(f"{BASE_URL}/api/business/entities", json=entity_data, headers=headers)
    print(f"Entity creation status: {response.status_code}")
    
    if response.status_code == 200:
        entity_info = response.json()
        print(f"✅ Business entity created: {entity_info}")
        
        # List entities
        print("\n🔍 Testing entity listing...")
        list_response = requests.get(f"{BASE_URL}/api/business/entities", headers=headers)
        if list_response.status_code == 200:
            entities = list_response.json()
            print(f"✅ Entities listed: {len(entities)} found")
        else:
            print(f"❌ Failed to list entities: {list_response.text}")
    else:
        print(f"❌ Entity creation failed: {response.text}")

def main():
    """Run all API tests"""
    print("🚀 Starting FastAPI REST endpoint tests...\n")
    
    # Test health endpoint
    if not test_health():
        print("❌ Health check failed, make sure the FastAPI server is running on port 8000")
        return
    
    # Test registration and login
    token = test_registration_and_login()
    
    # Test protected endpoints
    test_protected_endpoints(token)
    
    # Test business entities
    test_business_entity(token)
    
    print("\n🎉 API testing completed!")
    print("\n📚 For complete API documentation, visit: http://localhost:8000/docs")

if __name__ == "__main__":
    main()