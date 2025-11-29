import random

class ModelService:
    def __init__(self):
        # Load model artifacts here in real impl
        pass

    def predict(self, client_features: dict) -> dict:
        """
        Stub method to generate prediction based on features.
        In a real scenario, this would pass features to an ML model.
        """
        
        # Simulate some logic based on mock inputs or random variations
        base_income = 50000
        if client_features.get("city") == "Москва":
            base_income += 40000
        elif client_features.get("city") == "Санкт-Петербург":
            base_income += 20000
        
        age = client_features.get("age", 30)
        if 25 < age < 45:
            base_income += 15000
        
        # Add randomness
        predicted_income = base_income * random.uniform(0.9, 1.3)
        confidence = random.uniform(0.8, 0.98)
        
        return {
            "value": f"{int(predicted_income):,} ₽/мес".replace(",", " "),
            "growth": f"+{random.randint(2, 25)}% за год",
            "horizon": "12 месяцев",
            "confidence": round(confidence, 2),
            "vs_segment": round(random.uniform(0.5, 1.0), 2),
            "comment": "Сгенерированный ML прогноз на основе переданных признаков.",
            "shap_features": self._generate_shap_stub(predicted_income)
        }

    def _generate_shap_stub(self, income):
        return [
            {
                "feature_code": "salary_6to12m_avg",
                "feature_name": "Уровень зарплаты",
                "impact": 0.32,
                "explanation": "Высокая зарплата за последние полгода.",
                "details": "Рост на 25%."
            },
            {
                "feature_code": "region_avg",
                "feature_name": "Регион проживания",
                "impact": 0.15,
                "explanation": "Регион с высоким доходом.",
                "details": "Москва/СПб."
            }
        ]

model_service = ModelService()

