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
    
    # 1. Generate ML Prediction (Stub)
    prediction_data = model_service.predict(features)
    
    # 2. Generate AI Recommendations (Grok API)
    # Convert SQLAlchemy model to dict for the LLM service
    client_dict = {
        "full_name": client.full_name,
        "age": client.age,
        "city": client.city,
        "segment": client.segment,
        "income_category": client.income_category
    }
    
    # Call LLM
    recommendations_data = generate_recommendations(client_dict, prediction_data)
    
    # In a real app, we would save prediction and recommendations to DB here
    # For now, just return them merged together (PredictionBase doesn't strictly include recs 
    # in the schema we defined earlier, but let's check schemas.py to be sure)
    
    # Let's assume for this step we return the prediction, and the frontend might need to call 
    # a separate endpoint OR we enrich the response if we change the schema.
    # Checking schemas... PredictionBase has 'shap_features', ClientDetail has 'recommendations'.
    # The current endpoint returns PredictionBase. 
    
    # We should probably save the recommendations to the client in DB so that 
    # subsequent GET /clients/{id} calls see them, OR return a composite object.
    
    # Strategy: Update the client in DB with new recommendations
    # (Simulated for this demo since we don't have a full update flow)
    
    # Let's construct a response that matches what the frontend expects.
    # Frontend expects: 
    # setClientData({ ...res.data, prediction: predRes.data });
    # And recommendations are inside clientData.recommendations.
    
    # Wait, the current architecture separates Client data (static) from Prediction (dynamic).
    # But recommendations are conceptually linked to the prediction context.
    # Let's update the DB record for the client's latest recommendations.
    
    # Check if recs exist
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
