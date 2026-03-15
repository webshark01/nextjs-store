'use client';
import React, { useState, useEffect } from 'react'; // Combined imports
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // 1. Extract the search value to a stable variable
  const searchTerm = searchParams.get('search');

  const [search, setSearch] = useState(searchTerm?.toString() || '');

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/products?${params.toString()}`);
  }, 300);

  // 2. Use the variable in the dependency array
  useEffect(() => {
    if (!searchTerm) {
      setSearch('');
    }
  }, [searchTerm]); // Clean dependency

  return (
    <Input
      type="search"
      placeholder="search..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default NavSearch;
