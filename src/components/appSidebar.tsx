import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { SearchBar } from "./searchBar";

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  key: string;
}

interface AppSidebarProps {
  searchQuery: string;
  books: Book[] | undefined;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function AppSidebar({ searchQuery, books, onSearch, isLoading }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-80"} collapsible="icon">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Search Books
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className={`space-y-6 p-2 ${state === "collapsed" ? "hidden" : ""}`}>
              <SearchBar onSearch={onSearch} isLoading={isLoading} />
              
              {searchQuery && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Current Search</h3>
                  <div className="text-sm text-muted-foreground bg-card p-3 rounded-md border">
                    "{searchQuery}"
                  </div>
                  {books && (
                    <p className="text-sm text-accent-foreground font-medium">
                      {books.length} result{books.length !== 1 ? 's' : ''} found
                    </p>
                  )}
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}