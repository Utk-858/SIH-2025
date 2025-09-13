"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { updateProfileAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(5, "Age must be at least 5.").max(100),
  gender: z.enum(["male", "female", "other"]),
  height: z.coerce.number().min(50, "Height must be at least 50cm.").max(300),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      age: user.age,
      gender: user.gender,
      height: user.height,
      location: user.location || '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    const result = await updateProfileAction(formData);
    
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader />
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. New Delhi" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Your age" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 175" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
