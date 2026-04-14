import sys
from unittest.mock import MagicMock

# Mock heavy/missing dependencies before anything else imports them
mock_modules = [
    'tensorflow', 
    'tensorflow.keras', 
    'tensorflow.keras.models', 
    'tensorflow.keras.preprocessing',
    'easyocr', 
    'transformers', 
    'pandas', 
    'pyarrow',
    'h5py'
]

for module in mock_modules:
    sys.modules[module] = MagicMock()

# Mock specific attributes if needed
sys.modules['numpy'] = MagicMock()
import numpy
numpy.array = lambda x: x # Simple bypass for preprocess_url
