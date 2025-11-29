from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from . import models, schemas, database
from .ml_engine import model_service

# Create tables on startup
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AlphaBank Income Prediction Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/clients/search", response_model=List[schemas.ClientBase])
def search_clients(
    city: Optional[str] = None,
    age_min: Optional[int] = None,
    age_max: Optional[int] = None,
    income: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Client)
    if city:
        query = query.filter(models.Client.city == city)
    if age_min:
        query = query.filter(models.Client.age >= age_min)
    if age_max:
        query = query.filter(models.Client.age <= age_max)
    if income:
        query = query.filter(models.Client.income_category == income)
    
    return query.all()

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
    
    # Prepare features from client data + overrides
    features = {
        "city": req.city or client.city,
        "age": req.age or client.age,
        "segment": client.segment
    }
    
    # Call ML Stub
    prediction_data = model_service.predict(features)
    
    # In a real app, we would save this prediction to the DB here
    # For now, we just return it
    
    # Convert to Pydantic model format
    return prediction_data

@app.get("/api/metrics", response_model=List[schemas.ModelMetricBase])
def get_metrics(db: Session = Depends(database.get_db)):
    metrics = db.query(models.ModelMetric).all()
    if not metrics:
        # Return defaults if empty
        return [
            {"name": "MAE", "value": "8 500 ₽", "trend": "-4%", "description": "стабильность"},
            {"name": "R2", "value": "0.86", "trend": "+2 pp", "description": "Высокая точность"},
            {"name": "Coverage", "value": "82%", "trend": "+5 pp", "description": "Охват базы"}
        ]
    return metrics

