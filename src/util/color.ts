export function extractTextInBrackets(str: string) {
  const regex = /\[([^\]]+)\]/g;
  const matches = str.match(regex);

  return (matches ? matches.map((match: any) => match.slice(1, -1)) : []).at(0);
}
