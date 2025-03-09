export default function MemoCreateContainer() {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="mb-3 card-title">메모 등록</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">제목</legend>
            <input type="text" className="input" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">내용</legend>
            <textarea className="textarea"></textarea>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">시작일</legend>
            <input type="datetime-local" className="input" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">마감일</legend>
            <input type="datetime-local" className="input" />
          </fieldset>
          <div className="justify-end card-actions">
            <button className="btn btn-success btn-block">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
