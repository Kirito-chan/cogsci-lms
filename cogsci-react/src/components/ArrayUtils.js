// prettier-ignore
export default function createOrderedCommentsMap(commentsArray) {
  let commentsMapTemp = new Map();
  const originalComments = commentsArray.filter((c) => c.announcement_comment_id == null);
  const refComments = commentsArray.filter((c) => c.announcement_comment_id != null);
  
  for (const comment of originalComments) { commentsMapTemp.set(comment.id, []); }
  for (const comment of refComments) { commentsMapTemp.get(comment.announcement_comment_id).push(comment);}
  
  let commentsMap = new Map();

  commentsMapTemp.forEach((value, key) => {
    const comment = originalComments.filter((c) => c.id == key)[0];
    commentsMap.set(comment, value);
  });

  return commentsMap;
}
