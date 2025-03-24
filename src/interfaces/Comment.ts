interface IReply {
  commentId: string;
  parentId: string;
  content: string;
  createdDate: string;
  username: string;
  usersId: string;
}

interface IComment extends IReply {
  isOpenForm: boolean;
  replyContent: string;
  replies: IReply[];
}
