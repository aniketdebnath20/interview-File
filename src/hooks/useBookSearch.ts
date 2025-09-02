import { useQuery } from "@tanstack/react-query";

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  key: string;
}

interface OpenLibraryResponse {
  docs: Book[];
  numFound: number;
}

const searchBooks = async (query: string): Promise<Book[]> => {
  if (!query.trim()) return [];
  
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`
  );
  
  if (!response.ok) {
    throw new Error("Failed to search books");
  }
  
  const data: OpenLibraryResponse = await response.json();
  return data.docs;
};

export const useBookSearch = (query: string) => {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};