import IComment from "ts/interfaces/IComment";

function sortCommentsByCreatedAt(comments: IComment[]) {
  return comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
}

export default sortCommentsByCreatedAt;
