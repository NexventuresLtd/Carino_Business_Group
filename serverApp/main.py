from enum import Enum
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from Endpoints import auth, users, customer , events_category, events_venue,eventsPlanning,otp,incomes, expense, Report , team_lead, planning,investors,BanksManagement
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
import time
import hashlib
from fastapi.responses import JSONResponse
import asyncio
# ✅ Add these 2 lines here
from db.connection import SessionLocal
from Endpoints.BanksManagement import initialize_balance_calculator


bearer_scheme = HTTPBearer()
app = FastAPI(
    title="CENTER PIECE - Financial Management API",
    description="""
    CENTER PIECE is a comprehensive financial management platform providing 
    secure transaction processing, budgeting tools, investment tracking, 
    and real-time financial analytics for businesses and individuals.
    """,
    version="1.0.0",
    contact={
        "name": "CENTER PIECE Support",
        "email": "support@centerpiece.com",
    },
    license_info={
        "name": "Proprietary",
    },
    # docs_url=None,          # disables Swagger UI
    # redoc_url=None,         # disables ReDoc
    # openapi_url=None  
)

# In-memory store (for demo, use Redis in production)
pending_requests = {}

class PreventDuplicateRequestsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Read body safely
        body = await request.body()
        # Re-insert the body so downstream endpoints can read it
        async def receive():
            return {"type": "http.request", "body": body}

        # Build unique request key
        key_raw = f"{request.method}:{request.url.path}:{body.decode()}"
        key = hashlib.sha256(key_raw.encode()).hexdigest()

        if key in pending_requests:
            return JSONResponse({"detail": "Duplicate request in progress"}, status_code=429)

        pending_requests[key] = True

        try:
            response = await call_next(Request(request.scope, receive))
            return response
        finally:
            await asyncio.sleep(0.1)
            pending_requests.pop(key, None)

# ✅ Add the startup event RIGHT HERE
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    try:
        initialize_balance_calculator(db)
    finally:
        db.close()
# Configure CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(PreventDuplicateRequestsMiddleware)
app.mount("/static", StaticFiles(directory="static"), name="static")



app.include_router(otp.router)
app.include_router(BanksManagement.router)
app.include_router(investors.router)
app.include_router(planning.router)
app.include_router(team_lead.router)
app.include_router(Report.router)
app.include_router(incomes.router)
app.include_router(expense.router)
app.include_router(eventsPlanning.router)
app.include_router(auth.router)
app.include_router(users.router)  # Add this line
app.include_router(customer.router)  # Add this line
app.include_router(events_category.router)  # Add this line
app.include_router(events_venue.router)     # Add this line
@app.get("/secure-data")
def secure_data(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    # Here you can verify token however you want
    return {"message": "Access granted", "token_used": token}

@app.get("/", response_class=HTMLResponse)
async def read_root():
    html_content = f"""
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CENTER PIECE | Financial Management Platform</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .bg-dark-blue {{
            background-color: #1e3a8a;
        }}
        .text-dark-yellow {{
            color: #b45309;
        }}
        .bg-dark-yellow {{
            background-color: #b45309;
        }}
        .border-dark-yellow {{
            border-color: #b45309;
        }}
        .border-dark-blue {{
            border-color: #1e3a8a;
        }}
        .gradient-text {{
            background: linear-gradient(90deg, #b45309, #1e3a8a);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }}
        .financial-gradient {{
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
        }}
    </style>
</head>

<body class="financial-gradient text-gray-800">
    <div class="container mx-auto py-12 px-4">
        <header class="text-center mb-12">
            <h1 class="text-5xl font-bold mb-4 gradient-text">CENTER PIECE</h1>
            <p class="text-xl text-gray-600">Comprehensive Financial Management & Analytics Platform</p>
        </header>

        <section class="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-200">
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-2/3">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Financial Management API</h2>
                    <p class="text-gray-700 mb-6">
                        CENTER PIECE provides a robust API for comprehensive financial management solutions.
                        Our platform enables secure transaction processing, real-time analytics, budgeting tools,
                        and investment tracking for businesses and individuals.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-dark-yellow">
                            <h3 class="font-bold text-gray-900 mb-2">Account Management</h3>
                            <p class="text-gray-600 text-sm">Multi-currency accounts, balance tracking, and transfers</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-dark-blue">
                            <h3 class="font-bold text-gray-900 mb-2">Transaction Processing</h3>
                            <p class="text-gray-600 text-sm">Secure payments, expense tracking, and reconciliation</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-dark-yellow">
                            <h3 class="font-bold text-gray-900 mb-2">Budgeting & Analytics</h3>
                            <p class="text-gray-600 text-sm">Financial planning, spending analysis, and reports</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-dark-blue">
                            <h3 class="font-bold text-gray-900 mb-2">Investment Tracking</h3>
                            <p class="text-gray-600 text-sm">Portfolio management and performance monitoring</p>
                        </div>
                    </div>
                </div>
                
                <div class="md:w-1/3 flex flex-col justify-center">
                    <div class="space-y-4">
                        <a href="/docs" class="block w-full text-center px-6 py-3 bg-dark-yellow hover:bg-amber-700 text-white rounded-lg shadow-lg transition duration-300 font-medium">
                            Interactive Docs
                        </a>
                        <a href="/redoc" class="block w-full text-center px-6 py-3 bg-dark-blue hover:bg-blue-900 text-white rounded-lg shadow-lg transition duration-300 font-medium">
                            ReDoc Documentation
                        </a>
                        <a href="#" class="block w-full text-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition duration-300 font-medium">
                            API Status
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-300">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Financial Features</h3>
                <ul class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Secure Banking Integration
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Real-time Financial Analytics
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Multi-currency Support
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-yellow mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Automated Budgeting
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-yellow mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Investment Portfolio Tracking
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-dark-yellow mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Regulatory Compliance
                    </li>
                </ul>
            </div>
        </section>
        
        <footer class="mt-12 text-center text-gray-600 text-sm">
            <p>© 2025 Center Piece Financial. All rights reserved.</p>
            <p class="mt-2">Empowering financial decisions through technology</p>
        </footer>
    </div>
</body>

</html>
    """
    return HTMLResponse(content=html_content)