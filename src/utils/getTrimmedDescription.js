import { split } from "sentence-splitter";
export const getTrimmedDescription = (description) => {
  const splitData = split(description);
  let sentencesList = splitData.filter(
    (sentence) => sentence.type === "Sentence"
  );
  sentencesList = sentencesList.slice(0, 2);
  let output = sentencesList.reduce(
    (fullSentence, currentSentence) => fullSentence + currentSentence.raw,
    ""
  );
  return output;
};
