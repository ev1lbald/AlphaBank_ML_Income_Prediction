from pydantic import BaseModel
from typing import List, Optional

class ShapFeatureBase(BaseModel):
    feature_code: str
    feature_name: str
    impact: float
    explanation: str
    details: str

    class Config:
        from_attributes = True

class PredictionBase(BaseModel):
    value: str
    growth: str
    horizon: str
    confidence: float
    vs_segment: float
    comment: str
    shap_features: List[ShapFeatureBase] = []

    class Config:
        from_attributes = True

class RecommendationBase(BaseModel):
    products: List[dict]
    advice: List[dict]
    response_score: float

    class Config:
        from_attributes = True

class ClientBase(BaseModel):
    id: int
    full_name: str
    segment: str
    city: str
    age: int
    income_category: str
    risk_level: str

class ClientDetail(ClientBase):
    prediction: Optional[PredictionBase] = None
    recommendations: Optional[RecommendationBase] = None

    class Config:
        from_attributes = True

class ModelMetricBase(BaseModel):
    name: str
    value: str
    trend: str
    description: str

    class Config:
        from_attributes = True

class PredictRequest(BaseModel):
    # Optional overrides for features
    city: Optional[str] = None
    age: Optional[int] = None

