import logging
from fastapi import HTTPException

from bson import ObjectId

logger = logging.getLogger(__name__)

async def save_ai_result(collection, post_id: str, result_key: str, result_value) -> bool:
    if not ObjectId.is_valid(post_id):
        logger.error(f"Invalid post ID format: {post_id}")
        return False

    update_field = f"ai_results.{result_key}"
    result = await collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {update_field: result_value}}
    )
    return result.matched_count > 0


async def try_process_ai_request(
    fn,
    *,
    result_key: str,
    collection,
    post_id: str = None,
    save: bool = True,
    **inputs
):
    try:
        logger.info(f"Processing AI request for post {post_id} with key {result_key}")
        result = fn(**inputs)  # <- Flexible argument passing

        if save and post_id:
            logger.info(f"Saving AI result for post {post_id} with key {result_key}")
            await save_ai_result(collection, post_id, result_key, result)

        return result
    except Exception as e:
        logger.error(f"Error processing AI: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
