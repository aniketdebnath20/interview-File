import { Card, CardContent } from "@/components/ui/card";

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  key: string;
}

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-book bg-card border border-border cursor-pointer rounded-xl">
      <CardContent className="p-0 flex flex-col flex-1 relative">
        {/* Book Cover */}
        <div className="aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden relative">
          {coverUrl ? (
            <div className="relative w-full h-full">
              <img
                src={coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center h-full">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center text-white text-lg mb-2 shadow-lg">
                📚
              </div>
              <span className="text-xs font-medium">No cover</span>
            </div>
          )}

          {/* Year badge */}
          {book.first_publish_year && (
            <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full border shadow-sm">
              {book.first_publish_year}
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4 space-y-1.5 flex flex-col flex-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          {book.author_name && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {book.author_name.slice(0, 1).join(", ")}
              {book.author_name.length > 1 && ` +${book.author_name.length - 1}`}
            </p>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </CardContent>
    </Card>
  );
};
