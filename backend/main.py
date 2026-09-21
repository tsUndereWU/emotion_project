from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="blanchefort/rubert-base-cased-sentiment"
)

# Хранилище истории
history_store = []


@app.get("/")
def root():
    return {"message": "Emotion API is running"}


@app.post("/analyze")
def analyze(request: dict):
    text = request.get("text", "")
    if not text.strip():
        return {"error": "No text provided"}

    result = sentiment_pipeline(text)[0]
    sentiment = result["label"].lower()
    score = round(float(result["score"]), 4)

    emoji_map = {"positive": "😊", "negative": "😔", "neutral": "😐"}

    item = {
        "sentiment": sentiment,
        "score": score,
        "text": text,
        "emoji": emoji_map.get(sentiment, "😐"),
        "timestamp": datetime.datetime.now().isoformat(),
    }

    history_store.append(item)
    if len(history_store) > 50:
        history_store.pop(0)

    return item


@app.get("/history")
def get_history():
    return {"history": history_store}