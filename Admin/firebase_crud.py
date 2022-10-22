import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import re

# Initialize Firestore DB
cred = credentials.Certificate('firebase-private-key.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

def fetchUsers():
    users_ref = db.collection("Users")
    usersStream = users_ref.stream()
    usersData = []
    for user in usersStream:
        usersData.append(user.to_dict())
    return usersData


def fetchUser(id):
    user_ref = db.collection("Users").document(id).get()
    user = user_ref.to_dict()
    user["id"] = user_ref.id
    return user


def approveCourse(email, index, value):
    user = fetchUser(email)
    db.collection("Users").document(user).update({
        index: bool(value)
    })
  

