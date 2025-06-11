"use client";

import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface RecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onspeechend: (() => void) | null;
  onaudioend: (() => void) | null;
  onaudiostart: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      0: {
        transcript: string;
        confidence: number;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [started, setStarted] = useState(false);
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new ctor();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      // 마지막 결과만 가져옴
      const last = e.results[e.results.length - 1];
      const transcript = last[0].transcript;

      // 최종 결과일 경우에만 업데이트
      if (last.isFinal) {
        setResult(transcript);
      }
    };
    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      console.error("음성 인식 오류:", e.error);
      alert(`음성 인식 중 오류가 발생했습니다: ${e.error}`);
      setRecording(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setRecording(false);
    };

    recognition.onaudiostart = () => {
      setStarted(true);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleRecording = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (recording) {
      recognition.stop();
      setRecording(false);
      return;
    }
    setStarted(false);
    recognition.start();
    setRecording(true);
  };

  return {
    recording,
    result,
    toggleRecording,
    isAvailable,
  };
}
