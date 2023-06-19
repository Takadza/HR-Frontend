import { useCallback } from 'react';

import useDebounce from '../hooks/useDebounce';

import { SearchBox } from './SearchBox';

export function DebouncedSearch({
  runSearch,
  ...restOfProps
}: {
  runSearch: (searchTerms: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { searchTerms, setSearchTerms } = useDebounce((searchTerms: string) => {
    runSearch(searchTerms);
  }, 800);

  const handleTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerms(event.target.value);
    },
    [setSearchTerms]
  );

  return (
    <SearchBox
      name="search"
      placeholder="Search"
      value={searchTerms}
      onChange={handleTermChange}
      {...restOfProps}
    />
  );
}
