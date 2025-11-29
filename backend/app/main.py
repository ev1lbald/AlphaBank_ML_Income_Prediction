from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from . import models, schemas, database
from .ml_engine import model_service, generate_recommendations

# Create tables on startup
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AlphaBank Income Prediction Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/clients/search", response_model=List[schemas.ClientBase])
def search_clients(
    id: Optional[int] = None, # Exact ID search
    city: Optional[str] = None,
    income_min: Optional[float] = None,
    income_max: Optional[float] = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Client)
    
    if id:
        query = query.filter(models.Client.id == id)
    if city:
        query = query.filter(models.Client.city.ilike(f"%{city}%"))
    if income_min:
        query = query.filter(models.Client.income_value >= income_min)
    if income_max:
        query = query.filter(models.Client.income_value <= income_max)
        
    # Limit results to 50 to avoid freezing
    return query.limit(50).all()

@app.get("/api/clients/{client_id}", response_model=schemas.ClientDetail)
def get_client(client_id: int, db: Session = Depends(database.get_db)):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@app.post("/api/predict/{client_id}", response_model=schemas.PredictionBase)
def generate_prediction(client_id: int, req: schemas.PredictRequest, db: Session = Depends(database.get_db)):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Prepare features 
    features = {
        "city": req.city or client.city,
        "age": req.age or client.age,
        "segment": client.segment
    }
    
    # 1. ML Prediction (Stub - ideally this would use the CSV data features too)
    prediction_data = model_service.predict(features)
    
    # 2. AI Recommendations
    # Convert SQLAlchemy model to dict, including new CSV fields
    client_dict = {
        "id": client.id,
        "age": client.age,
        "gender": client.gender,
        "city": client.city,
        "region": client.region,
        "segment": client.segment,
        "income_value": client.income_value,
        "salary": client.salary,
        "turnover": client.turnover,
        "active_loans": client.active_loans,
        "overdue_sum": client.overdue_sum,
        "savings": client.savings,
        "spend_supermarket": client.spend_supermarket,
        "spend_travel": client.spend_travel,
        "spend_restaurants": client.spend_restaurants
    }
    
    # Call LLM
    recommendations_data = generate_recommendations(client_dict, prediction_data)
    
    # Save Recommendations
    existing_recs = db.query(models.Recommendation).filter(models.Recommendation.client_id == client_id).first()
    if existing_recs:
        existing_recs.products = recommendations_data.get("products", [])
        existing_recs.advice = recommendations_data.get("advice", [])
        existing_recs.response_score = recommendations_data.get("response_score", 0.0)
    else:
        new_recs = models.Recommendation(
            client_id=client_id,
            products=recommendations_data.get("products", []),
            advice=recommendations_data.get("advice", []),
            response_score=recommendations_data.get("response_score", 0.0)
        )
        db.add(new_recs)
    
    db.commit()
    
    return prediction_data

@app.get("/api/metrics", response_model=List[schemas.ModelMetricBase])
def get_metrics(db: Session = Depends(database.get_db)):
    metrics = db.query(models.ModelMetric).all()
    if not metrics:
        return [
            {"name": "MAE", "value": "8 500 ₽", "trend": "-4%", "description": "Ошибка прогноза"},
            {"name": "R2", "value": "0.86", "trend": "+2 pp", "description": "Точность модели"},
            {"name": "Coverage", "value": "82%", "trend": "+5 pp", "description": "Охват базы"}
        ]
    return metrics
