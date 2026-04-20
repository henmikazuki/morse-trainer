from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from .quiz_logic import generate_quiz_set

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/api/start")
def start():
    return {"questions": generate_quiz_set()}


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    """トップページの表示"""
    return templates.TemplateResponse(request, "index.html")
