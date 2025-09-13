import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/lib/types";
import { Crown } from "lucide-react";

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-yellow-600";
    return "text-muted-foreground";
  }

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <span className={getRankColor(entry.rank)}>{entry.rank}</span>
                    {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-400" />}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={entry.user.avatarUrl} alt={entry.user.name} />
                    <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{entry.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-primary">{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
