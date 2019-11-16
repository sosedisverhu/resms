function arrayMove(arr, from, to) {
  arr.splice((to < 0 ? arr.length + to : to), 0, arr.splice(from, 1)[0]);
}

export default function (arr, from, to) {
  const arrCopy = arr.slice();
  arrayMove(arrCopy, from, to);
  return arrCopy;
}
