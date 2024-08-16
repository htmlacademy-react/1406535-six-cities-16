function capitalizeFirstLetter(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function convertScoreToPercent(score: number, maxScore: number) {
  return `${Math.round(score) * 100 / maxScore}%`;
}

export { capitalizeFirstLetter, convertScoreToPercent };
