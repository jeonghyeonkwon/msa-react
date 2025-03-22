interface ISimpleBoard {
  boardId: string;
  title: string;
  username: string;
  createdAt: string;
  commentCount: Number;
}

interface IBoardCreate {
  title: string;
  content: string;
}

interface IBoardDetail {
  boardId: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  viewCount: Number;
}
