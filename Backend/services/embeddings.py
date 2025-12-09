import os
import json
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

EMBED_FILE = "data/embeddings_index.json"


def get_embedding(text: str):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def save_embedding(entry_id: int, embedding):
    with open(EMBED_FILE, "r") as f:
        data = json.load(f)

    data.append({
        "id": entry_id,
        "embedding": embedding
    })

    with open(EMBED_FILE, "w") as f:
        json.dump(data, f, indent=2)


def search_similar(text: str):
    query_emb = np.array(get_embedding(text))

    with open(EMBED_FILE, "r") as f:
        stored = json.load(f)

    if not stored:
        return []

    similarities = []
    for item in stored:
        emb = np.array(item["embedding"])
        score = cosine_similarity([query_emb], [emb])[0][0]
        similarities.append((item["id"], score))

    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:3]  # top 3 related entries
