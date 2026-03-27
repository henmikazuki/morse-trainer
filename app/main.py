from fastapi import FastAPI
from quiz_logic import generate_quiz_set

app = FastAPI()


@app.get("/api/start")
def start():
    return {"questions": generate_quiz_set()}
