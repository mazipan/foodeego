export function formatRating(num: number): string {
  if (num < 0.09) {
    return Math.round(num).toString();
  }

  const rounded = Math.round(num * 10) / 10;
  return rounded.toString();
}

export const chunk = <T>(arr: Array<T>, chunkSize: number) => {
  return arr.reduce((resultArray: Array<Array<T>>, item: T, index: number) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as Array<Array<T>>);
};
