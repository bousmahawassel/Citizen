import requests
from backend.backend.settings import JSONBLOB_URL

if __name__ == "__main__":
    with open("data.json", "w") as f:
        f.write(requests.get(JSONBLOB_URL).json())
        f.close()