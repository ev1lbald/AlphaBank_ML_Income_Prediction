from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from .database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    segment = Column(String)
    city = Column(String)
    age = Column(Integer)
    income_category = Column(String)
    risk_level = Column(String)

    prediction = relationship("Prediction", back_populates="client", uselist=False)
    recommendations = relationship("Recommendation", back_populates="client")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), unique=True)
    
    value = Column(String) # e.g. "145 000 ₽/мес" - storing as string for demo display simplicity or Float if strict
    growth = Column(String) # e.g. "+18% за год"
    horizon = Column(String) # e.g. "12 месяцев"
    confidence = Column(Float) # 0.93
    vs_segment = Column(Float) # 0.68
    comment = Column(Text)

    shap_features = relationship("ShapFeature", back_populates="prediction")
    client = relationship("Client", back_populates="prediction")

class ShapFeature(Base):
    __tablename__ = "shap_features"

    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    
    feature_code = Column(String) # salary_6to12m_avg
    feature_name = Column(String)
    impact = Column(Float)
    explanation = Column(String)
    details = Column(String)

    prediction = relationship("Prediction", back_populates="shap_features")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    
    # Storing simple JSON structure for products/advice lists to simplify the relational model for this demo
    # Or we can store the entire recommendation blob
    products = Column(JSON) # List of product objects
    advice = Column(JSON)   # List of advice objects
    response_score = Column(Float)

    client = relationship("Client", back_populates="recommendations")

class ModelMetric(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True) # e.g. MAE, R2
    value = Column(String)
    trend = Column(String)
    description = Column(String) # e.g. "стабильность"

