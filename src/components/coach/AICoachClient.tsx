'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { chatWithCoach } from '@/ai/flows/coach-chat-flow';
import { Loader2, Paperclip, Send, User, Bot, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AICoachClient() {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoDataUri(reader.result as string);
        toast({
            title: "Video Uploaded",
            description: "You can now chat with the AI coach about your video.",
        })
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const historyForAI = messages.map(m => ({
            role: m.role,
            parts: [{text: m.content}]
        }))

      const response = await chatWithCoach({
        // Only send the video on the first message of a conversation where a video has been uploaded
        videoDataUri: messages.length === 0 && videoDataUri ? videoDataUri : undefined, 
        message: input,
        history: historyForAI
      });
      
      const botMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error chatting with coach:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the AI coach.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Chat with your Coach</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!videoDataUri ? (
            <div className="aspect-video w-full rounded-md border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center p-4">
                <Upload className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <h3 className="font-semibold text-lg">Upload an optional video</h3>
                <p className="text-muted-foreground text-sm mb-4">You can ask for general tips or upload a video for specific feedback.</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    Select File
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                />
            </div>
        ) : (
            <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                <video src={URL.createObjectURL(videoFile!)} controls className="w-full h-full object-cover"></video>
            </div>
        )}

        <div className="h-[400px] w-full border rounded-md p-4 space-y-4 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Ask me anything about fitness or upload a video for analysis!</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {message.role === 'model' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("rounded-lg px-4 py-2 max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                            <p className="text-sm">{message.content}</p>
                        </div>
                         {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-secondary flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
             <div className="flex items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask your coach a question..."
                    disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
