import requests
import json

url = "http://localhost:3000/schools"

payload = json.dumps({
  "name": "Schoolsss",
  "status": "old",
  "startTime": "8:30am",
  "endTime": "1:30pm",
  "shift": "Morning",
  "hasProjector": False,
  "hasLaptop": False,
  "address": {
    "town": "Nehar Kot",
    "tehsil": "Barkhan",
    "district": "Barkhan",
    "state": "Balochistan",
    "latitude": 29.79,
    "longitude": 69.47
  },
  "organization": {
    "name": "publicschool"
  }
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers,data=payload)

print(response.text)
