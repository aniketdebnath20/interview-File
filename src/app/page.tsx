"use client";

import { AppSidebar } from "@/components/appSidebar";
import { BookCard } from "@/components/bookCard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useBookSearch } from "@/hooks/useBookSearch";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: books, isLoading, error } = useBookSearch(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    toast("Failed to search books. Please try again.");
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Header with sidebar trigger */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center text-white text-sm">
                📚
              </div>
              <h1 className="text-xl font-bold text-foreground hidden sm:block">
                Book Finder
              </h1>
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">
              Discover millions of books
            </div>
          </div>
        </header>

        <AppSidebar
          searchQuery={searchQuery}
          books={books}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 p-4 md:p-6">
          {!searchQuery && (
            <div className="flex items-center justify-center min-h-[70vh]">
              <div className="text-center max-w-md px-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-hero rounded-full flex items-center justify-center text-3xl md:text-4xl text-white mb-6 mx-auto animate-fade-in">
                  📚
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Welcome to Book Finder
                </h2>
                <p className="text-muted-foreground">
                  Start your literary journey by searching for books using the
                  sidebar.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Searching...
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
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

          {books && books.length > 0 && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Search Results
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {books.length} book{books.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
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

          {books && books.length === 0 && searchQuery && !isLoading && (
            <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
              <div className="text-center px-4">
                <div className="text-5xl md:text-6xl mb-4">📖</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
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
    </SidebarProvider>
  );
};

export default Index;
