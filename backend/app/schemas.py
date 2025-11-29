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
    products: Optional[List[dict]] = []
    advice: Optional[List[dict]] = []
    response_score: Optional[float] = 0.0

    class Config:
        from_attributes = True

class ClientBase(BaseModel):
    id: int
    full_name: Optional[str]
    segment: Optional[str]
    city: Optional[str]
    region: Optional[str]
    age: Optional[int]
    income_category: Optional[str]
    risk_level: Optional[str]
    
    # Financials
    income_value: Optional[float]
    salary: Optional[float]
    turnover: Optional[float]
    active_loans: Optional[int]
    savings: Optional[float]

    class Config:
        from_attributes = True

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
    city: Optional[str] = None
    age: Optional[int] = None
