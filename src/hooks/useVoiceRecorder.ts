"use client";

import { useEffect, useRef, useState } from "react";

type RecognitionConstructor = new () => RecognitionInstance;

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
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      0: {
        transcript: string;
        confidence: number;
      };
      length: number;
    };
    length: number;
  };
}

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<string>("");
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const [isAvailable, setIsAvailable] = useState(true); // 사용 가능 여부

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setIsAvailable(false);
      alert(
        "이 브라우저에서는 음성 인식 기능을 사용할 수 없습니다.\n크롬이나 안드로이드 기반 브라우저를 이용해주세요."
      );
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setResult(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("음성 인식 오류:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleRecording = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (recording) {
      recognition.stop();
      setRecording(false);
    } else {
      recognition.start();
      setRecording(true);
    }
  };

  return {
    recording,
    result,
    toggleRecording,
    isAvailable,
  };
}
