"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { performAnalysis } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, Video, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const RECORDING_DURATION = 10000; // 10 seconds

export function VideoRecorder({ testSlug }: { testSlug: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [countdown, setCountdown] = useState(RECORDING_DURATION / 1000);

  const startCamera = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(mediaStream);
        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
    } catch (err) {
        console.error("Error accessing camera:", err);
        toast({
            title: "Camera Error",
            description: "Could not access camera. Please check permissions.",
            variant: "destructive",
        });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
      startCamera();
      return () => stopCamera();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartRecording = () => {
    if (stream) {
      setIsRecording(true);
      setCountdown(RECORDING_DURATION / 1000);
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        setIsProcessing(true);
        
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64data = reader.result as string;
            const result = await performAnalysis(testSlug, base64data);
            
            setIsProcessing(false);
            if (result.submissionId) {
                toast({ title: "Analysis Complete!", description: "Redirecting to your results." });
                router.push(`/results/${result.submissionId}`);
            } else {
                toast({ title: "Analysis Failed", description: result.error, variant: "destructive" });
            }
        };
      };

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
      }, RECORDING_DURATION);
    }
  };
  
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setCountdown(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);


  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-4">
        <div className="aspect-video w-full rounded-md overflow-hidden bg-muted flex items-center justify-center relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!stream && "hidden"}`}
          />
          {!stream && (
            <div className="text-muted-foreground flex flex-col items-center">
                <Camera className="h-12 w-12 mb-2" />
                <p>Waiting for camera access...</p>
            </div>
          )}
          {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full">
                  <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  REC {new Date(countdown * 1000).toISOString().substr(14, 5)}
              </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
            {!isRecording && !isProcessing && (
                <Button onClick={handleStartRecording} disabled={!stream} size="lg">
                    <Video className="mr-2 h-5 w-5" /> Start Recording
                </Button>
            )}
            {isRecording && (
                <Button variant="destructive" size="lg" disabled>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Recording...
                </Button>
            )}
            {isProcessing && (
                <Button disabled size="lg">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Analysis...
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
