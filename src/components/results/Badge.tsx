"use client"

import { Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  badge: 'Bronze' | 'Silver' | 'Gold';
}

const badgeConfig = {
  Bronze: {
    color: 'text-yellow-600',
    bg: 'bg-yellow-600/10',
    name: 'Bronze',
  },
  Silver: {
    color: 'text-gray-400',
    bg: 'bg-gray-400/10',
    name: 'Silver',
  },
  Gold: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    name: 'Gold',
  },
};

export default function Badge({ badge }: BadgeProps) {
  const config = badgeConfig[badge];

  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-50 duration-500">
      <div className={cn(
        "relative flex h-32 w-32 items-center justify-center rounded-full",
        config.bg
      )}>
        <Medal className={cn("h-20 w-20", config.color)} />
      </div>
      <div className="text-center">
        <h2 className={cn("text-3xl font-bold font-headline", config.color)}>
            {config.name} Badge
        </h2>
        <p className="text-muted-foreground">Congratulations!</p>
      </div>
    </div>
  );
}
