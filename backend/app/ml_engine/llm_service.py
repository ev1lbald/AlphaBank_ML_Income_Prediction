import os
import json
from openai import OpenAI

# Initialize OpenAI client pointing to OpenRouter API (for free Grok access)
client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"), # Now using OpenRouter Key
    base_url="https://openrouter.ai/api/v1",
)

def generate_recommendations(client_data: dict, prediction: dict) -> dict:
    """
    Generates personalized recommendations using Grok 4.1 Fast (Free) via OpenRouter.
    Returns a dict with 'products' and 'advice' lists.
    """
    
    # Construct prompt with client context
    prompt = f"""
    Ты — профессиональный финансовый консультант Альфа-Банка.
    Твоя задача — сгенерировать персональные рекомендации для клиента на основе его данных и ML-прогноза.

    ДАННЫЕ КЛИЕНТА:
    - ID: {client_data.get('id')}
    - Возраст: {client_data.get('age')} лет
    - Пол: {"М" if client_data.get('gender') == 1 else "Ж" if client_data.get('gender') == 0 else "Не указан"}
    - Город: {client_data.get('city')} ({client_data.get('region')})
    - Сегмент: {client_data.get('segment')}
    
    ФИНАНСОВЫЙ ПРОФИЛЬ:
    - Текущий доход (оценка): {client_data.get('income_value')} руб.
    - Зарплата (офиц.): {client_data.get('salary')} руб.
    - Оборот по картам: {client_data.get('turnover')} руб.
    - Сбережения/Вклады: {client_data.get('savings')} руб.
    - Активные кредиты: {client_data.get('active_loans')} шт.
    - Просрочка: {client_data.get('overdue_sum')} руб.
    
    ТРАТЫ (за период):
    - Супермаркеты: {client_data.get('spend_supermarket')} руб.
    - Рестораны: {client_data.get('spend_restaurants')} руб.
    - Путешествия: {client_data.get('spend_travel')} руб.
    
    ML-ПРОГНОЗ:
    - Прогнозируемый доход: {prediction.get('value')}
    - Ожидаемый рост: {prediction.get('growth')}
    - Доверие модели: {prediction.get('confidence')}

    ЗАДАЧА:
    1. Предложи 2-3 конкретных банковских продукта Альфа-Банка (Альфа-Карта, Кредитная карта 365 дней, Вклад, Инвестиции, Travel-карта, Страхование), которые идеально подходят под этот профиль. 
       - Если много трат на еду -> карта с кэшбэком.
       - Если есть просрочки -> программа рефинансирования или улучшения истории.
       - Если большие сбережения -> Премиум или Инвестиции.
    2. Дай 1 полезный, конкретный финансовый совет, опираясь на цифры (например, "Вы тратите 30% дохода на рестораны, рекомендуем...").

    ФОРМАТ ОТВЕТА (JSON):
    {{
        "products": [
            {{
                "name": "Название продукта",
                "tagline": "Почему это выгодно именно этому клиенту",
                "meta": ["Кэшбэк 5%", "Бесплатно"]
            }},
            ...
        ],
        "advice": [
            {{
                "title": "Заголовок совета",
                "tagline": "Текст совета с цифрами и фактами",
                "meta": ["Оптимизация"]
            }}
        ],
        "response_score": 0.95
    }}
    
    Отвечай ТОЛЬКО валидным JSON. Не добавляй markdown разметку (```json).
    """

    try:
        response = client.chat.completions.create(
            model="x-ai/grok-4.1-fast:free", # Free Grok model on OpenRouter
            messages=[
                {"role": "system", "content": "Ты — полезный AI-ассистент, который отвечает строго в формате JSON."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            extra_headers={
                "HTTP-Referer": "https://alfabank-demo.com", # Required by OpenRouter for free tier sometimes
                "X-Title": "AlphaBank Demo",
            }
        )
        
        content = response.choices[0].message.content
        print(f"AI Raw Response: {content}") # LOGGING ADDED
        
        # Cleanup JSON
        clean_content = content.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_content)
        print(f"AI Parsed Data: {data}") # LOGGING ADDED
        return data

    except Exception as e:
        print(f"Error generating recommendations via Grok (OpenRouter): {e}")
        return {
            "products": [],
            "advice": [{"title": "Ошибка AI", "tagline": "Сервис временно недоступен.", "meta": ["Error"]}],
            "response_score": 0.0
        }
