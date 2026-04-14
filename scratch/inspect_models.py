import os
import json
import pickle
import tensorflow as tf

def inspect_h5(file_path):
    print(f"--- Inspecting H5: {file_path} ---")
    try:
        model = tf.keras.models.load_model(file_path)
        model.summary()
        print(f"Inputs: {model.inputs}")
        print(f"Outputs: {model.outputs}")
    except Exception as e:
        print(f"Error loading H5: {e}")

def inspect_tflite(file_path):
    print(f"\n--- Inspecting TFLite: {file_path} ---")
    try:
        interpreter = tf.lite.Interpreter(model_path=file_path)
        interpreter.allocate_tensors()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        print(f"Input Details: {input_details}")
        print(f"Output Details: {output_details}")
    except Exception as e:
        print(f"Error loading TFLite: {e}")

def inspect_json(file_path):
    print(f"\n--- Inspecting JSON: {file_path} ---")
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            print(f"Keys in JSON: {list(data.keys())[:20]}...")
            print(f"Sample data: {str(data)[:200]}")
    except Exception as e:
        print(f"Error loading JSON: {e}")

def inspect_pkl(file_path):
    print(f"\n--- Inspecting PKL: {file_path} ---")
    try:
        with open(file_path, 'rb') as f:
            data = pickle.load(f)
            print(f"Type of PKL data: {type(data)}")
            if hasattr(data, 'word_index'):
                print(f"Vocabulary size: {len(data.word_index)}")
                print(f"Sample vocab: {list(data.word_index.keys())[:20]}")
    except Exception as e:
        print(f"Error loading PKL: {e}")

if __name__ == "__main__":
    base_path = r"a:\PhishGaurd\PhishGaurd_Project\ai_engine\models"
    inspect_h5(os.path.join(base_path, "phishguard_model_cnn.h5"))
    inspect_tflite(os.path.join(base_path, "phishguard_brain.tflite"))
    inspect_json(os.path.join(base_path, "tokenizer_dictionary.json"))
    inspect_pkl(os.path.join(base_path, "tokenizer.pkl"))
