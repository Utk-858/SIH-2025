import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Test } from '@/lib/types';

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  const Icon = test.icon;
  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="font-headline text-xl">{test.name}</CardTitle>
            <div className="p-3 bg-primary/10 rounded-md">
                <Icon className="h-6 w-6 text-primary" />
            </div>
        </div>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Can add more details here if needed */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tests/${test.slug}`}>
            Start Test <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
