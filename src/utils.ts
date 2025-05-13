export function truncateText(text: string, maxLetters: number): string {
  if (text.length <= maxLetters) {
    return text;
  }
  return text.slice(0, maxLetters) + "...";
}