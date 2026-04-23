# ml_logic/predict.py
import sys
import pickle
import numpy as np
import os

# 1. Filename ka sahi rasta (Path) nikalna
# Ye line dhoonday gi ke predict.py kahan pari hai aur model bhi wahin dhoonday gi
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'salary_model.pkl')

# 2. Model Load karein
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# 3. Command line se input lein
experience = float(sys.argv[1])

# 4. Predict aur Print
prediction = model.predict([[experience]])
print(round(prediction[0], 2))