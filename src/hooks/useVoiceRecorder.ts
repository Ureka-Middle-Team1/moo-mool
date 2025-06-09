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
      length: number;
    };
    length: number;
  };
}

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<string>("");
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setResult(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("음성 인식 오류:", event.error);
      alert(`음성 인식 중 오류가 발생했습니다: ${event.error}`);
      setRecording(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setRecording(false);
    };

    // 사파리에서 start()가 아무 반응 없을 경우 잡아냄
    recognition.onaudiostart = () => {
      setStarted(true); // 성공적으로 녹음 시작됨
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
      setStarted(false);
      recognition.start();
      setRecording(true);

      // 3초 이내에 onaudiostart가 안 오면 실패 처리
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!started) {
          recognition.stop();
          setRecording(false);
          alert(
            "이 브라우저에서는 음성 인식이 작동하지 않습니다.\nSafari에서는 동작하지 않을 수 있습니다."
          );
        }
      }, 3000);
    }
  };

  return {
    recording,
    result,
    toggleRecording,
    isAvailable,
  };
}
