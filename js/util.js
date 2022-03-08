const getRandomIntFromRange = (from, to) => {
  if (from < 0 || to < 0 || to < from) {
    throw 'Invalid parameters';
  }

  const fromRounded = Math.ceil(from);
  const toRounded = Math.floor(to);

  const difference = toRounded - fromRounded;
  const rand = Math.random();

  return Math.floor(rand * (difference + 1)) + fromRounded;
};

const getRandomFloatFromRange = (from, to, precision) => {
  if (from < 0 || to < 0 || to < from) {
    throw 'Invalid parameters';
  }

  const precisionMultiplier = Math.pow(10, precision);

  // танцы с бубном, чтобы учитывать только переданное количество знаков после запятой в границах диапазона
  // и избавиться таким образом от влияния шальной единички в конце float'а на округление
  const fromPrecision = from.toString().split('.')[1].length || 0;
  const fromShiftedPrecision = Math.max(fromPrecision - precision, 0);
  const fromShiftedPrecisionMultiplier = Math.pow(10, fromShiftedPrecision);

  const toPrecision = to.toString().split('.')[1].length || 0;
  const toShiftedPrecision = Math.max(toPrecision - precision, 0);
  const toShiftedPrecisionMultiplier = Math.pow(10, toShiftedPrecision);

  const fromShifted = Math.ceil(Math.round(from * precisionMultiplier * fromShiftedPrecisionMultiplier) / fromShiftedPrecisionMultiplier);
  const toShifted = Math.floor(Math.round(to * precisionMultiplier * toShiftedPrecisionMultiplier) / toShiftedPrecisionMultiplier);

  return (getRandomIntFromRange(fromShifted, toShifted) / precisionMultiplier).toFixed(precision);
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

const getRandomArrayElements = (elements) => {
  const result = [];

  elements.forEach((element) => {
    const isIncluded = getRandomIntFromRange(0, 1);

    if (isIncluded) {
      result.push(element);
    }
  });

  return result;
};

export {getRandomIntFromRange, getRandomFloatFromRange, zeroPad, getRandomArrayElement, getRandomArrayElements};
