"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Submission } from "@/lib/types";
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { reviewSubmission } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubmissionsTableProps {
  submissions: Submission[];
}

export function SubmissionsTable({ submissions: initialSubmissions }: SubmissionsTableProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [submissions, setSubmissions] = React.useState(initialSubmissions);

    const handleReview = async (submissionId: string, status: 'verified' | 'rejected') => {
        const result = await reviewSubmission(submissionId, status);
        if (result.success) {
            toast({
                title: "Success",
                description: `Submission has been ${status}.`
            });
            setSubmissions(submissions.map(s => s.id === submissionId ? {...s, status} : s));
        }
    }


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="font-mono text-xs">{sub.userId}</TableCell>
              <TableCell>{sub.testType}</TableCell>
              <TableCell>{format(new Date(sub.createdAt), "PPP")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    sub.status === 'verified'
                      ? 'secondary'
                      : sub.status === 'rejected'
                      ? 'destructive'
                      : 'default'
                  }
                  className={cn({
                      'bg-green-500/20 text-green-400 border-green-500/30': sub.status === 'verified',
                  })}
                >
                  {sub.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Video</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submission Video</DialogTitle>
                      <DialogDescription>
                        Test: {sub.testType} by user {sub.userId}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                        <video src={sub.videoUrl} controls autoPlay className="w-full h-full object-cover"></video>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={() => handleReview(sub.id, 'verified')}>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="sr-only">Approve</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleReview(sub.id, 'rejected')}>
                  <X className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Reject</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
