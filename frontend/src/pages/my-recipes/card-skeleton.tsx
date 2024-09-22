import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function CardSkeleton() {
  return (
    <Card className="flex flex-col justify-between animate-pulse">
      <CardHeader>
        <div className="w-full h-48 bg-gray-300 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </CardFooter>
    </Card>
  );
}
