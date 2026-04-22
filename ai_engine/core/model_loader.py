import os
import joblib
import json

class ModelLoader:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        models_path = os.path.join(base_path, "models")
        
        print(f"Loading models from: {models_path}")
        
        # Load URL Scikit-Learn Model
        try:
            # Try to load the new joblib model first
            joblib_path = os.path.join(models_path, "phishguard_url_model.joblib")
            if os.path.exists(joblib_path):
                self.url_model = joblib.load(joblib_path)
                print("Successfully loaded URL Scikit-Learn model.")
            else:
                print(f"Warning: Model not found at {joblib_path}. Please run lexical_lab.py first.")
                self.url_model = None
        except Exception as e:
            print(f"Error loading URL model: {e}")
            self.url_model = None

        # Placeholder for Legacy Tokenizer Metadata (No longer strictly needed with Pipelines)
        self.char_index = {}

    def get_url_model(self):
        return self.url_model
    
    def get_char_index(self):
        return self.char_index

model_loader = ModelLoader()
