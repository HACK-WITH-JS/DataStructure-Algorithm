function merge(arr, leftIndex, midIndex, rightIndex) {
  let leftAreaIndex = leftIndex;
  let rightAreaIndex = midIndex + 1;
  let tempArrIndex = leftIndex;
  let tempArr = [];
  tempArr.length = rightIndex + 1;
  tempArr.fill(0, 0, rightIndex + 1);

  while (leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex) {
    if (arr[leftAreaIndex] <= arr[rightAreaIndex]) {
      tempArr[tempArrIndex] = arr[leftAreaIndex++];
    } else {
      tempArr[tempArrIndex] = arr[rightAreaIndex++];
    }
    tempArrIndex++;
  }

  if (leftAreaIndex > midIndex) {
    for (let i = rightAreaIndex; i <= rightIndex; i++) {
      tempArr[tempArrIndex++] = arr[i];
    }
  } else {
    for (let i = leftAreaIndex; i <= midIndex; i++) {
      tempArr[tempArrIndex++] = arr[i];
    }
  }

  for (let i = leftIndex; i <= rightIndex; i++) {
    arr[i] = tempArr[i];
  }
}

function mergeSort(arr, leftIndex, rightIndex) {
  if (leftIndex < rightIndex) {
    let midIndex = parseInt((leftIndex + rightIndex) / 2);
    mergeSort(arr, leftIndex, midIndex);
    mergeSort(arr, midIndex + 1, rightIndex);
    merge(arr, leftIndex, midIndex, rightIndex);
  }
}

export { mergeSort };
