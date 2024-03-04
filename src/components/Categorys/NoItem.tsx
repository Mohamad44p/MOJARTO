import { FileQuestion } from "lucide-react";

export default function NoItem() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        <p>There are no Products in this category</p>
      </h2>
      <p className="text-sm mt-2 text-center leading-6 text-muted-foreground">
        <p>Try changing the category</p>
      </p>
    </div>
  );
}
