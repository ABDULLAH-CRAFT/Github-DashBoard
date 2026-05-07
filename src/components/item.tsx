type Result = {
  pageid: number;
  title: string;
  snippet: string;
};

type ItemProps = {
  result: Result;
};

function Item({ result }: ItemProps) {
  return (
    <div>
      <h3>{result.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
    </div>
  );
}

export default Item;