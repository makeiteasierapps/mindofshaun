from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

async def create_blog(post_data, collection):
    now = datetime.utcnow()
    post_data.update({
        "created_at": now,
        "updated_at": now,
        "ai_results": {}
    })
    result = await collection.insert_one(post_data)
    return await collection.find_one({"_id": result.inserted_id})


async def update_blog(post_id, data, collection):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID format")
    
    update_data = {k: v for k, v in data.items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()

    if not update_data:
        raise HTTPException(status_code=400, detail="No valid update data provided")

    result = await collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")

    return await collection.find_one({"_id": ObjectId(post_id)})
