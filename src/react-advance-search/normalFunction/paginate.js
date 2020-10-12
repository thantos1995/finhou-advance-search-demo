export function paginateArrayHelper(array, pageSize, pageNumber) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

export function paginate() {}
