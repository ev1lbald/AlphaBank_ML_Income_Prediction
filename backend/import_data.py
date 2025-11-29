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
        df = pd.read_csv(csv_path)
    except Exception as e:
        print(f"Error reading CSV: {e}")
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

            # Mapping CSV columns to Model fields
            client = models.Client(
                id=client_id,
                age=clean_int(row.get('age')),
                gender=clean_int(row.get('gender')),
                city=str(row.get('city_smart_name', 'Unknown')),
                region=str(row.get('adminarea', 'Unknown')),
                
                # Financials
                income_value=clean_float(row.get('incomeValue')),
                # incomeValueCategory seems to be mapped to category ID or string, let's use directly
                income_category=str(row.get('incomeValueCategory', 'Unknown')),
                salary=clean_float(row.get('salary_6to12m_avg')),
                turnover=clean_float(row.get('total_rur_amt_cm_avg')),
                
                # Risk & Products
                active_loans=clean_int(row.get('loan_cnt')),
                overdue_sum=clean_float(row.get('hdb_bki_total_max_overdue_sum')),
                savings=clean_float(row.get('turn_fdep_db_sum_v2')),
                
                # Spending habits
                spend_supermarket=clean_float(row.get('avg_by_category__amount__sum__cashflowcategory_name__supermarkety')),
                spend_travel=clean_float(row.get('avg_by_category__amount__sum__cashflowcategory_name__puteshestvija')),
                spend_restaurants=clean_float(row.get('transaction_category_restaurants_sum_amt_m2')),
                
                # Generated/Derived
                full_name=f"Клиент {client_id}",
                segment="Массовый" if clean_float(row.get('incomeValue')) < 100000 else "Премиум",
                risk_level="Высокий" if clean_float(row.get('hdb_bki_total_max_overdue_sum')) > 0 else "Низкий"
            )

            # Upsert (merge) logic: check if exists
            existing = db.query(models.Client).filter(models.Client.id == client_id).first()
            if existing:
                # Update fields
                for key, value in client.__dict__.items():
                    if not key.startswith('_'):
                        setattr(existing, key, value)
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
    csv_path = os.path.join(base_dir, "data", "users.csv.zip")
    import_data(csv_path)

