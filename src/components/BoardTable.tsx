import BoardRow from "./BoardRow";

interface BoardTableProps {
  isSuccess: boolean;
  list: ISimpleBoard[];
}
export default function BoardTable({ isSuccess, list }: BoardTableProps) {
  return (
    <>
      {isSuccess &&
        list.map((dto: ISimpleBoard) => <BoardRow boardData={dto} />)}
    </>
  );
}
