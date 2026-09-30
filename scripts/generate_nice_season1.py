import json
import os
import re

# Generator for Season 1 set in Nice, France
# Characters: Léa (29 ans) & Adam (42 ans)
# Theme: Secret interdit, dossier Atlas, tour d'affaires à Nice avec vue sur la Baie des Anges
# 8 episodes x ~8000 words + 24 integrated photos

EPISODES_METADATA = [
    {
        "id": 1,
        "title": "Ep 1 - L'heure sup",
        "season": 1,
        "free": True,
        "price": 0,
        "cover": "ep1_1.jpg",
        "images": [
            {"file": "ep1_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep1_2.jpg", "prompt": "empty office hallway at night, shadows, suspenseful atmosphere, cinematic --ar 16:9"},
            {"file": "ep1_3.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"}
        ]
    },
    {
        "id": 2,
        "title": "Ep 2 - Le dossier confidentiel",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep2_1.jpg",
        "images": [
            {"file": "ep2_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep2_2.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"},
            {"file": "ep2_3.jpg", "prompt": "office elevator at night, two silhouettes, psychological tension, no face --ar 16:9"}
        ]
    },
    {
        "id": 3,
        "title": "Ep 3 - La réunion de 22h",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep3_1.jpg",
        "images": [
            {"file": "ep3_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep3_2.jpg", "prompt": "empty office hallway at night, shadows, suspenseful atmosphere, cinematic --ar 16:9"},
            {"file": "ep3_3.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"}
        ]
    },
    {
        "id": 4,
        "title": "Ep 4 - L'ascenseur",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep4_1.jpg",
        "images": [
            {"file": "ep4_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep4_2.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"},
            {"file": "ep4_3.jpg", "prompt": "office elevator at night, two silhouettes, psychological tension, no face --ar 16:9"}
        ]
    },
    {
        "id": 5,
        "title": "Ep 5 - Le message effacé",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep5_1.jpg",
        "images": [
            {"file": "ep5_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep5_2.jpg", "prompt": "empty office hallway at night, shadows, suspenseful atmosphere, cinematic --ar 16:9"},
            {"file": "ep5_3.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"}
        ]
    },
    {
        "id": 6,
        "title": "Ep 6 - Le déplacement",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep6_1.jpg",
        "images": [
            {"file": "ep6_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep6_2.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"},
            {"file": "ep6_3.jpg", "prompt": "office elevator at night, two silhouettes, psychological tension, no face --ar 16:9"}
        ]
    },
    {
        "id": 7,
        "title": "Ep 7 - La porte qui reste ouverte",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep7_1.jpg",
        "images": [
            {"file": "ep7_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep7_2.jpg", "prompt": "empty office hallway at night, shadows, suspenseful atmosphere, cinematic --ar 16:9"},
            {"file": "ep7_3.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"}
        ]
    },
    {
        "id": 8,
        "title": "Ep 8 - Ce qui n'aurait jamais dû arriver",
        "season": 1,
        "free": False,
        "price": 0.99,
        "cover": "ep8_1.jpg",
        "images": [
            {"file": "ep8_1.jpg", "prompt": "dark cinematic office at 10pm, woman alone at desk, city lights through window, moody thriller, tension, no nudity --ar 16:9"},
            {"file": "ep8_2.jpg", "prompt": "close up of hands typing on laptop, tension, dramatic lighting --ar 16:9"},
            {"file": "ep8_3.jpg", "prompt": "office elevator at night, two silhouettes, psychological tension, no face --ar 16:9"}
        ]
    }
]

print("Metadata defined successfully.")
