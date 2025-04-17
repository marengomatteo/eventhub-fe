import { useSearch } from "@tanstack/react-router";
import { FC } from "react";

const SearchResultsPage: FC<{ location: any }> = ({ location }) => {
  const search = useSearch({ from: "/events" });

  return <div>{search.location}</div>;
};

export default SearchResultsPage;
