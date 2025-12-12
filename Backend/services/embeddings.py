from openai import OpenAI
import os
import json
import numpy as np

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

EMBED_FILE = "data/embeddings.json"

# ------------------------------
# Load & Save embedding storage
# ------------------------------
def load_db():
    try:
        with open(EMBED_FILE, "r") as f:
            return json.load(f)
    except:
        return {}

def save_db(data):
    with open(EMBED_FILE, "w") as f:
        json.dump(data, f, indent=2)

# ------------------------------
# Generate embedding
# ------------------------------
def get_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def save_embedding(entry_id, embedding):
    db = load_db()
    db[str(entry_id)] = embedding
    save_db(db)

# ------------------------------
# Search similar entries
# ------------------------------
def cosine_similarity(v1, v2):
    v1 = np.array(v1)
    v2 = np.array(v2)
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

def search_similar(query):
    q_emb = get_embedding(query)
    db = load_db()

    results = []
    for entry_id, emb in db.items():
        score = cosine_similarity(q_emb, emb)
        results.append({
            "id": entry_id,
            "score": float(score)
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:5]
