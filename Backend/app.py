import json
from fastapi import FastAPI
from services.summarizer import summarize_text
from services.sentiment import analyze_sentiment
from services.embeddings import get_embedding, save_embedding, search_similar

JOURNAL_FILE = "data/journal_entries.json"

app = FastAPI()


def load_entries():
    with open(JOURNAL_FILE, "r") as f:
        return json.load(f)


def save_entries(data):
    with open(JOURNAL_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.post("/add-entry")
def add_entry(entry: dict):
    text = entry["text"]

    # AI Processing
    summary = summarize_text(text)
    sentiment = analyze_sentiment(text)

    # Save entry
    entries = load_entries()
    entry_id = len(entries) + 1

    new_entry = {
        "id": entry_id,
        "text": text,
        "summary": summary,
        "sentiment": sentiment
    }

    entries.append(new_entry)
    save_entries(entries)

    # Save embedding for similarity search
    emb = get_embedding(text)
    save_embedding(entry_id, emb)

    return {
        "message": "Entry added successfully!",
        "summary": summary,
        "sentiment": sentiment
    }


@app.post("/search")
def search_similar_entries(query: dict):
    text = query["text"]
    results = search_similar(text)
    return {"results": results}

@app.get("/")
def home():
    return {"message": "DailyBuddy Backend is Running!I AM TIRED T_T ... Pssst!Watch Searching for a world that doesnt exist for a break ;p"}

