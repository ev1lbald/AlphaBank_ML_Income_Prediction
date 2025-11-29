from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, Text, BigInteger
from sqlalchemy.orm import relationship
from .database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    
    # Demographics
    age = Column(Integer, nullable=True)
    gender = Column(Integer, nullable=True) # 0/1
    city = Column(String, nullable=True, index=True) # city_smart_name
    region = Column(String, nullable=True) # adminarea
    
    # Financials
    income_value = Column(Float, nullable=True) # incomeValue
    income_category = Column(String, nullable=True, index=True) # incomeValueCategory
    salary = Column(Float, nullable=True) # salary_6to12m_avg
    turnover = Column(Float, nullable=True) # total_rur_amt_cm_avg
    
    # Products & Risk
    active_loans = Column(Integer, nullable=True) # loan_cnt
    overdue_sum = Column(Float, nullable=True) # hdb_bki_total_max_overdue_sum
    savings = Column(Float, nullable=True) # turn_fdep_db_sum_v2 (Deposits)
    
    # Spending Habits (for AI context)
    spend_supermarket = Column(Float, nullable=True)
    spend_travel = Column(Float, nullable=True)
    spend_restaurants = Column(Float, nullable=True)
    spend_transport = Column(Float, nullable=True)

    # Legacy fields (keep for compatibility if needed, or map from above)
    full_name = Column(String, nullable=True) # Generated placeholder like "Client {id}"
    segment = Column(String, nullable=True) # Inferred from income/category
    risk_level = Column(String, nullable=True) # Inferred from overdue

    prediction = relationship("Prediction", back_populates="client", uselist=False, cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="client", cascade="all, delete-orphan")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), unique=True)
    
    value = Column(String)
    growth = Column(String)
    horizon = Column(String)
    confidence = Column(Float)
    vs_segment = Column(Float)
    comment = Column(Text)

    shap_features = relationship("ShapFeature", back_populates="prediction", cascade="all, delete-orphan")
    client = relationship("Client", back_populates="prediction")

class ShapFeature(Base):
    __tablename__ = "shap_features"

    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    
    feature_code = Column(String)
    feature_name = Column(String)
    impact = Column(Float)
    explanation = Column(String)
    details = Column(String)

    prediction = relationship("Prediction", back_populates="shap_features")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    
    products = Column(JSON)
    advice = Column(JSON)
    response_score = Column(Float)

    client = relationship("Client", back_populates="recommendations")

class ModelMetric(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    value = Column(String)
    trend = Column(String)
    description = Column(String)
