const likes = {}; 
// postId -> Set(userId)

export function likePost(postId, userId) {
  if (!likes[postId]) likes[postId] = new Set();
  likes[postId].add(userId);
  return likes[postId].size;
}

export function unlikePost(postId, userId) {
  if (!likes[postId]) return 0;
  likes[postId].delete(userId);
  return likes[postId].size;
}

export function countLikes(postId) {
  if (!likes[postId]) return 0;
  return likes[postId].size;
}

export function likedBy(postId, userId) {
  if (!likes[postId]) return false;
  return likes[postId].has(userId);
}
