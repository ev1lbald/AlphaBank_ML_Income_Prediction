import os
import json
from openai import OpenAI

# Initialize OpenAI client pointing to xAI API
client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",
)

def generate_recommendations(client_data: dict, prediction: dict) -> dict:
    """
    Generates personalized recommendations using Grok LLM via xAI API.
    Returns a dict with 'products' and 'advice' lists.
    """
    
    # Construct prompt with client context
    prompt = f"""
    Ты — профессиональный финансовый консультант Альфа-Банка.
    Твоя задача — сгенерировать персональные рекомендации для клиента на основе его данных и ML-прогноза.

    ДАННЫЕ КЛИЕНТА:
    - Имя: {client_data.get('full_name', 'Клиент')}
    - Возраст: {client_data.get('age')} лет
    - Город: {client_data.get('city')}
    - Сегмент: {client_data.get('segment')}
    - Категория текущего дохода: {client_data.get('income_category')}
    
    ML-ПРОГНОЗ:
    - Прогнозируемый доход: {prediction.get('value')}
    - Ожидаемый рост: {prediction.get('growth')}
    - Доверие модели: {prediction.get('confidence')}

    ЗАДАЧА:
    1. Предложи 2 конкретных банковских продукта Альфа-Банка (карты, вклады, инвестиции, кредиты), которые идеально подходят под этот профиль и прогноз.
    2. Дай 1 полезный финансовый совет (advice), который поможет клиенту достичь прогнозируемого роста или улучшить состояние.

    ФОРМАТ ОТВЕТА (JSON):
    {{
        "products": [
            {{
                "name": "Название продукта",
                "tagline": "Краткое рекламное описание (1 предложение)",
                "meta": ["Тег 1", "Тег 2"]
            }},
            ...
        ],
        "advice": [
            {{
                "title": "Заголовок совета",
                "tagline": "Текст совета (1-2 предложения)",
                "meta": ["Тег пользы"]
            }}
        ],
        "response_score": 0.95
    }}
    
    Отвечай ТОЛЬКО валидным JSON без лишнего текста.
    """

    try:
        response = client.chat.completions.create(
            model="grok-2-latest", # Using latest stable Grok model
            messages=[
                {"role": "system", "content": "Ты — полезный AI-ассистент, который отвечает строго в формате JSON."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7, # Slight creativity allowed
        )
        
        content = response.choices[0].message.content
        
        # Try to parse JSON from response
        # Sometimes LLMs wrap JSON in ```json ... ``` blocks, so we clean it
        clean_content = content.replace("```json", "").replace("```", "").strip()
        
        return json.loads(clean_content)

    except Exception as e:
        print(f"Error generating recommendations via Grok: {e}")
        # Fallback stub if API fails
        return {
            "products": [
                {
                    "name": "Альфа-Карта (Fallback)",
                    "tagline": "Кэшбэк на всё и процент на остаток.",
                    "meta": ["Популярное"]
                }
            ],
            "advice": [
                {
                    "title": "Сервис временно недоступен",
                    "tagline": "Не удалось получить персональные рекомендации от AI.",
                    "meta": ["Error"]
                }
            ],
            "response_score": 0.0
        }

