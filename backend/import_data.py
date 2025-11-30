import csv
import sys
import os
import pandas as pd
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models

def clean_float(val):
    try:
        if pd.isna(val) or val == '':
            return 0.0
        return float(val)
    except:
        return 0.0

def clean_int(val):
    try:
        if pd.isna(val) or val == '':
            return 0
        return int(float(val)) # Handle "32.0" string
    except:
        return 0

def import_data(csv_path: str):
    print(f"Reading {csv_path}...")
    
    # Use Pandas for easier handling of large CSVs and NaNs
    try:
        # pandas can read CSV from zip directly
        df = pd.read_csv(csv_path)
        print(f"Successfully read CSV with {len(df)} rows")
    except Exception as e:
        print(f"Error reading CSV: {e}")
        import traceback
        traceback.print_exc()
        return

    db = SessionLocal()
    
    # Clear existing clients (optional, for clean slate)
    # db.query(models.Client).delete()
    # db.commit()
    
    print(f"Importing {len(df)} rows...")
    
    count = 0
    for _, row in df.iterrows():
        try:
            client_id = clean_int(row.get('id'))
            if client_id == 0: continue # Skip invalid IDs

            # Get target value
            target_value = clean_float(row.get('target'))
            
            # Create client with only id and target from submission.csv
            client = models.Client(
                id=client_id,
                target=target_value,
                # Other fields will be None (nullable in model)
                full_name=f"Клиент {client_id}"
            )

            # Upsert (merge) logic: check if exists
            existing = db.query(models.Client).filter(models.Client.id == client_id).first()
            if existing:
                # Update only target field if exists
                existing.target = target_value
                if not existing.full_name:
                    existing.full_name = f"Клиент {client_id}"
            else:
                db.add(client)
            
            count += 1
            if count % 1000 == 0:
                db.commit()
                print(f"Processed {count} rows...")
                
        except Exception as e:
            print(f"Error processing row {count}: {e}")
            continue

    db.commit()
    db.close()
    print("Import finished successfully.")

if __name__ == "__main__":
    # Use script directory to locate data
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, "data", "submission.csv")
    import_data(csv_path)
