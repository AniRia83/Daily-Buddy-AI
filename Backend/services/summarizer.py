from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_text(text):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "Summarize the user's journal entry in 1–2 sentences."},
            {"role": "user", "content": text}
        ]
    )

    return response.choices[0].message.content
