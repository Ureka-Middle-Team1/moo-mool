import React, { JSX } from "react";

export const parseSentences = (text: string): string[] =>
  text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

export const parseHashtags = (text: string): string[] =>
  text
    .split(" ")
    .map((w) => `#${w.trim()}`)
    .filter((h) => h.length > 1);

export const renderHighlightedText = (sentence: string) => {
  const regex = /([\"“”'])(.*?)(\1)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(sentence)) !== null) {
    const [fullMatch] = match;
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    if (matchStart > lastIndex) {
      parts.push(sentence.slice(lastIndex, matchStart));
    }

    parts.push(
      <span className="font-bold" key={matchStart}>
        {fullMatch}
      </span>
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < sentence.length) {
    parts.push(sentence.slice(lastIndex));
  }

  return parts;
};
