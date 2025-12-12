import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.summarizer import summarize_text
from services.sentiment import analyze_sentiment
from services.embeddings import get_embedding, save_embedding, search_similar
from services.mood import analyze_mood  # <-- REAL mood analyzer function

from datetime import datetime

JOURNAL_FILE = "data/journal_entries.json"

app = FastAPI()

# -------------------------
#  ENABLE CORS FOR FRONTEND
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://daily-buddy-ai.vercel.app",
        "https://daily-buddy-ai.onrender.com"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Helper functions
# -------------------------
def load_entries():
    with open(JOURNAL_FILE, "r") as f:
        return json.load(f)

def save_entries(data):
    with open(JOURNAL_FILE, "w") as f:
        json.dump(data, f, indent=2)

# -------------------------
# API Routes
# -------------------------

@app.post("/add_entry")
def add_entry(entry: dict):
    text = entry["text"]

    summary = summarize_text(text)
    sentiment = analyze_sentiment(text)
    mood_score = analyze_mood(text)  # <-- FIXED: now calls correct function

    entries = load_entries()
    entry_id = len(entries) + 1

    new_entry = {
        "id": entry_id,
        "text": text,
        "summary": summary,
        "sentiment": sentiment,
        "mood": mood_score
    }

    entries.append(new_entry)
    save_entries(entries)

    emb = get_embedding(text)
    save_embedding(entry_id, emb)

    return {
        "message": "Entry added successfully!",
        "summary": summary,
        "sentiment": sentiment,
        "mood": mood_score
    }


@app.post("/search")
def search_similar_entries(query: dict):
    text = query["text"]
    results = search_similar(text)
    return {"results": results}


@app.get("/get_entries")
def get_entries():
    return load_entries()


# -------------------------
# Mood analysis for graph
# -------------------------
@app.get("/mood")
def get_mood_graph():   # <-- FIXED: renamed to avoid overriding
    entries = load_entries()

    mood_map = {
        "happy": 3,
        "excited": 2,
        "neutral": 0,
        "stressed": -1,
        "sad": -2
    }

    weekly = []
    for e in entries:
        weekly.append({
            "date": e.get("date", f"Entry {e['id']}"),
            "score": mood_map.get(e["sentiment"], 0)
        })

    return {"weekly_moods": weekly[-7:]}  # last 7 entries


@app.get("/")
def home():
    return {
        "message": "DailyBuddy Backend is Running!"
    }
