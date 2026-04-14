import pandas as pd

def peek_parquet(file_path):
    print(f"--- Peeking Parquet: {file_path} ---")
    try:
        df = pd.read_parquet(file_path)
        print(f"Shape: {df.shape}")
        print(f"Columns: {df.columns.tolist()}")
        print(f"Head:\n{df.head()}")
    except Exception as e:
        print(f"Error reading Parquet: {e}")

if __name__ == "__main__":
    peek_parquet(r"a:\PhishGaurd\PhishGaurd_Project\ai_engine\datasets\final_dataset_ULTIMATE.parquet")
