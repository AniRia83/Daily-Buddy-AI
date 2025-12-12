from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_mood(text):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "Rate the emotional mood of this journal entry from 1 (very negative) to 10 (very positive). Respond with a single number only."
            },
            {"role": "user", "content": text}
        ]
    )

    try:
        return int(response.choices[0].message.content.strip())
    except:
        return 5
