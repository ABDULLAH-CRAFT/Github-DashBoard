import useSWR from "swr";
import Item from "./item";
import { searchWiki } from "../api/wikiApi";

type Result = {
  pageid: number;
  title: string;
  snippet: string;
};

type ListProps = {
  searchTerm: string;
};

type WikiResponse = {
  query: {
    search: Result[];
  };
};

function List({ searchTerm }: ListProps) {
  const { data, error, isLoading } = useSWR<WikiResponse>(
    searchTerm ? ["wiki", searchTerm] : null,
    () => searchWiki(searchTerm)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const results = data?.query?.search || [];

  return (
    <div>
      {results.map((result) => (
        <Item key={result.pageid} result={result} />
      ))}
    </div>
  );
}

export default List;