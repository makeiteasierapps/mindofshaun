#!/usr/bin/env python3
"""
Simple script to generate a new admin password hash
"""

from passlib.context import CryptContext
import getpass

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_password_hash():
    print("Admin Password Reset Tool")
    print("=" * 30)
    
    # Get new password
    while True:
        new_password = getpass.getpass("Enter new password: ")
        confirm_password = getpass.getpass("Confirm new password: ")
        
        if new_password == confirm_password:
            break
        else:
            print("Passwords don't match. Please try again.")
    
    # Generate hash
    hashed_password = pwd_context.hash(new_password)
    
    print("\nNew password hash generated:")
    print("-" * 40)
    print(hashed_password)
    print("-" * 40)
    
    print("\nTo update your admin password, you need to update the 'hashed_password' field")
    print("in your MongoDB admin collection with the hash above.")
    
    print("\nMongoDB update command:")
    print('db.admins.updateOne({"username": "YOUR_USERNAME"}, {"$set": {"hashed_password": "' + hashed_password + '"}})')
    
    return hashed_password

if __name__ == "__main__":
    generate_password_hash() 