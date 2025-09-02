"use client";

import { BookCard } from "@/components/bookCard";
import { useBookSearch } from "@/hooks/useBookSearch";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: books, isLoading } = useBookSearch(searchQuery);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Search (top bar) */}
      <div className="md:hidden bg-card border-b border-border p-4">
        <h1 className="text-lg font-bold text-foreground mb-3">Book Finder</h1>
        <input
          id="search"
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Sidebar (desktop only) */}
      <aside className="hidden md:block w-72 bg-card border-r border-border p-6">
        <h1 className="text-lg font-bold text-foreground mb-6">Book Finder</h1>
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Search for books
          </label>
          <input
            id="search"
            type="text"
            placeholder="e.g. Harry Potter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        {/* Empty State */}
        {!searchQuery && (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-hero rounded-full flex items-center justify-center text-2xl md:text-4xl text-white mb-6 mx-auto animate-fade-in">
                📚
              </div>
              <h2 className="text-xl md:text-3xl font-bold mb-4 text-foreground">
                Welcome to Book Finder
              </h2>
              <p className="text-muted-foreground">
                Start your literary journey by searching for books.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Searching...
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[2/3] mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {books && books.length > 0 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Search Results
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {books.length} book{books.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {books.map((book, index) => (
                <div
                  key={book.key}
                  className="animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {books && books.length === 0 && searchQuery && !isLoading && (
          <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="text-center px-4">
              <div className="text-4xl md:text-6xl mb-4">📖</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-foreground">
                No books found
              </h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
