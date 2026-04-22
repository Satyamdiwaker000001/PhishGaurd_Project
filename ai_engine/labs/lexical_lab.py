import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
import json

class LexicalLab:
    def __init__(self, dataset_path="datasets/raw_data/final_dataset_ULTIMATE.csv"):
        self.dataset_path = dataset_path
        self.model_save_path = "models/phishguard_url_model.joblib"

    def train(self, subset_size=100000):
        print(f"Loading dataset from: {self.dataset_path}")
        try:
            # Load a subset for performance
            df = pd.read_csv(self.dataset_path).sample(min(subset_size, 400000), random_state=42)
        except Exception as e:
            print(f"Error loading CSV: {e}. Trying absolute path...")
            # Fallback for different working directories
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            df = pd.read_csv(os.path.join(base_dir, self.dataset_path)).sample(subset_size, random_state=42)

        print(f"Training on {len(df)} samples...")
        
        X = df['url'].astype(str)
        y = df['label']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Create Pipeline: TF-IDF (character-level) + Random Forest
        # We use char-level n-grams to capture sub-domain and path patterns
        pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(analyzer='char', ngram_range=(3, 5), max_features=10000)),
            ('clf', RandomForestClassifier(n_estimators=50, max_depth=25, n_jobs=-1, random_state=42))
        ])

        print("Fitting model (this may take a moment)...")
        pipeline.fit(X_train, y_train)

        # Evaluation
        y_pred = pipeline.predict(X_test)
        print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))

        # Save Model
        print(f"Saving model to {self.model_save_path}...")
        os.makedirs(os.path.dirname(self.model_save_path), exist_ok=True)
        joblib.dump(pipeline, self.model_save_path)
        
        print("Training Complete!")

if __name__ == "__main__":
    lab = LexicalLab()
    lab.train()
