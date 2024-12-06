import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import settings
from app.routers import api_router


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(app="main:app", reload=True, port=8080)
