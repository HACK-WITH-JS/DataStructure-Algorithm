function binarySearch(arr, target, start, end) {
  if (start > end) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (target > arr[mid]) {
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid - 1);
  }
}

export { binarySearch };
