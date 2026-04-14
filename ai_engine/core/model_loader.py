import os
import tensorflow as tf
import pickle
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
        
        # Load URL CNN Model
        try:
            self.url_model = tf.keras.models.load_model(os.path.join(models_path, "phishguard_model_cnn.h5"))
            print("Successfully loaded URL CNN model.")
        except Exception as e:
            print(f"Error loading URL model: {e}")
            self.url_model = None

        # Load Tokenizer Metadata
        try:
            with open(os.path.join(models_path, "tokenizer_dictionary.json"), 'r') as f:
                self.char_index = json.load(f)
            print("Successfully loaded tokenizer dictionary.")
        except Exception as e:
            print(f"Error loading tokenizer: {e}")
            self.char_index = {}

    def get_url_model(self):
        return self.url_model
    
    def get_char_index(self):
        return self.char_index

model_loader = ModelLoader()
