interface ISimpleBoard {
  boardId: string;
  title: string;
  username: string;
  createDate: string;
  commentCount: Number;
}

interface IBoardCreate {
  title: string;
  content: string;
}
