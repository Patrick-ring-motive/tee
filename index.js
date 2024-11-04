function tee(iterable = [], n = 2) {
  n = Math.max(n, 2);
  if (!iterable.next) {
    iterable =
      iterable[Symbol.iterator]() ??
      iterable[Symbol.asyncIterator]() ??
      [][Symbol.iterator].call(iterable);
  }
  const iterators = [];
  const values = [];

  for (let i = 0; i !== n; i++) {
    iterators.push(
      (function* iterator() {
        const values_length = values.length;
        for (let x = 0; x !== values_length; x++) {
          yield values[x];
        }

        let result;
        do {
          result = iterable.next();
          if (result?.done === false) {
            values.push(result.value);
            yield result.value;
          }
        } while (result?.done === false);
      })(),
    );
  }
  return iterators;
}

function ztee(iterable = [], n = 2) {
  n = Math.max(n, 2);
  if (!iterable.next) {
    iterable =
      iterable[Symbol.iterator]() ??
      iterable[Symbol.asyncIterator]() ??
      [][Symbol.iterator].call(iterable);
  }
  const iterators = [];
  const values = [];

  for (let i = 0; i !== n; i++) {
    iterators.push(
      (function* iterator() {
        const values_length = values.length;
        for (let x = 0; x !== values_length; x++) {
          try {
            yield values[x];
          } catch {
            continue;
          }
        }

        let result;
        do {
          try {
            result = iterable.next();
            if (result?.done === false) {
              values.push(result.value);
              yield result.value;
            }
          } catch {
            break;
          }
        } while (result?.done === false);
      })(),
    );
  }
  return iterators;
}


function asyncTee(iterable = [], n = 2) {
  n = Math.max(n, 2);
  if (!iterable.next) {
    iterable =
      iterable[Symbol.asyncIterator]() ??
      iterable[Symbol.iterator]() ??
      [][Symbol.iterator].call(iterable);
  }
  const iterators = [];
  const values = [];

  for (let i = 0; i !== n; i++) {
    iterators.push(
      (async function* asyncIterator() {
        const values_length = values.length;
        for (let x = 0; x !== values_length; x++) {
          yield await values[x];
        }

        let result;
        do {
          result = await iterable.next();
          if (result?.done === false) {
            values.push(result.value);
            yield await result.value;
          }
        } while (result?.done === false);
      })(),
    );
  }
  return iterators;
}
