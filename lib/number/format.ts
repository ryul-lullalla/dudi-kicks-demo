import fromExponential from "from-exponential";
import Big from "big.js";

export const formatCommas = (
  x: number | string | undefined,
  decimalPlaces?: number,
) => {
  if (x === undefined) return "";
  if (typeof x === "number") {
    let formattedNumber = x.toLocaleString();
    if (decimalPlaces !== undefined) {
      const roundedNumber = x.toFixed(decimalPlaces);
      const decimalPart = roundedNumber.split(".")[1];
      formattedNumber = formattedNumber.replace(/\.\d+$/, `.${decimalPart}`);
    }
    return formattedNumber;
  } else {
    let formattedString = x.replace(
      /(\..*)$|(\d)(?=(\d{3})+(?!\d))/g,
      (digit, fract) => fract || digit + ",",
    );
    if (decimalPlaces !== undefined) {
      const decimalPart = formattedString.split(".")[1];
      if (decimalPart !== undefined) {
        formattedString = `${formattedString.split(".")[0]}.${decimalPart.slice(
          0,
          decimalPlaces,
        )}`;
      }
    }
    return formattedString;
  }
};

// 콤마 추가
export const comma = (
  number: number | string | undefined | null,
  precision?: number,
) => {
  if (
    number === "" ||
    number === null ||
    number === undefined ||
    isNaN(Number(number))
  ) {
    return "0";
  }
  const splitVal = fromExponential(number).split(".");
  if (precision !== undefined && splitVal[1]) {
    splitVal[1] = splitVal[1].substring(0, precision);
  }
  splitVal[0] = splitVal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (Number(splitVal[1]) !== 0 && splitVal[1]) {
    return splitVal.join(".");
  }
  return splitVal[0];
};

// 콤마 제거
export const decomma = (number: number | string | undefined) => {
  if (number === null || number === undefined) {
    return "0";
  }
  return number.toString().replace(/,/g, "");
};

// 소수점 버림 처리
export const floor = (num: number | string, precision?: number) => {
  if (!num) return "0";
  const _num = fromExponential(num);
  let [integer, digits] = _num.split(".");
  if (precision === 0) return integer;
  digits = digits && precision ? digits.slice(0, precision) : digits;
  return digits === undefined ? integer : `${integer}.${digits}`;
};

/**
 * Number format
 * @deprecated amount 숫자 표기 정책 변경 (약어 x, 소수점 모두 표기)
 */
export const formatNumber = (
  amount: number | string | null | undefined,
  smallAmountExp: boolean = true,
) => {
  if (!amount) return "0";
  const _amount = Number(amount);
  // 1조 이상
  if (_amount >= 1_000_000_000_000) {
    return "1T";
  }
  // 100억 이상
  if (_amount >= 10_000_000_000) {
    return "1B";
  }
  // 100만 이상
  if (_amount >= 1_000_000) {
    return "1M";
  }
  // 0.01 보다 작은 양수일 경우
  if (_amount > 0 && _amount < 0.01) {
    if (smallAmountExp) {
      return `<${0.01}`;
    }

    if (_amount > 0 && _amount < 0.001) {
      return `<${0.001}`;
    }
    return comma(_amount, 3);
  }
  return comma(_amount, 2);
};

export const formatBalance = (
  amount: number | string | null | undefined,
  smallAmountExp: boolean = false,
) => {
  if (!amount) return "0";
  const _amount = Number(amount);
  // 1조 이상
  if (_amount >= 1_000_000_000_000) {
    return "1T";
  }
  // 100억 이상
  if (_amount >= 10_000_000_000) {
    return "1B";
  }
  // 100만 이상
  if (_amount >= 1_000_000) {
    return "1M";
  }
  // 0.01 보다 작은 양수일 경우
  if (_amount > 0 && _amount < 0.01) {
    return `<${0.01}`;
  }
  return comma(_amount, 2);
};

// 첫 글자 대문자 변환 함수
export const firstToUpper = (str: string) => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 숫자 정수 부분의 0 값을 trim
 * 00000.012 -> 0.012
 */
export const trimZero = (value: string) => {
  const regex = /^0*(\d+)(\.\d+)?0*$/;
  return value.replace(regex, "$1$2");
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
};

// New: Abbreviate large numbers (e.g. 1_500_000 -> "1.5M")
export const formatAbbreviated = (
  input: number | string | Big,
  digits: number = 2,
): string => {
  const big = input instanceof Big ? input : new Big(input.toString());
  // Determine suffix dynamically based on digit count (groups of 3)
  const SUFFIXES = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];

  // Number of integer digits
  const intDigits = new Big(big.toFixed(0)).abs().toString().length;
  const groupIndex = Math.floor((intDigits - 1) / 3); // e.g., 1 for thousands, 2 for millions

  // No abbreviation needed (less than 1_000)
  if (groupIndex === 0) {
    return comma(big.toFixed(digits));
  }

  // Clamp index to available suffixes
  const suffixIndex = Math.min(groupIndex, SUFFIXES.length - 1);
  const suffix = SUFFIXES[suffixIndex];

  const divisorPower = suffixIndex * 3; // 1 -> 1_000 (10^3), 2 -> 1_000_000 (10^6), etc.
  const divisor = new Big(10).pow(divisorPower);

  const quotient = big.div(divisor);

  // Convert to string with *truncation* (round-down) at the requested precision.
  const quotientStr = quotient.toFixed(digits, 0);

  // Trim trailing zeros and dangling decimal point
  const formattedNumber = quotientStr
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.0+$/, "")
    .replace(/\.$/, "");

  return `${formattedNumber}${suffix}`;
};

export function formatPrice(input: number | string) {
  let num = typeof input === "string" ? parseFloat(input) : input;

  // 입력값이 숫자로 변환되지 않는 경우, 오류 메시지 반환
  if (isNaN(num)) {
    return "";
  }

  // 소수점 둘째 자리 이하 값이 0.01 미만일 경우
  if (num < 0.01 && num > 0) {
    return "<0.01";
  }

  // 소수점 둘째자리까지 표시
  num = parseFloat(num.toFixed(2));

  // 1조 이상의 경우
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  }
  // 100억 이상의 경우
  else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  // 100만 이상의 경우
  else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  }

  // 기본적으로 숫자를 문자열로 반환
  return comma(num.toString());
}

export function timeSince(date: any) {
  const seconds = Math.floor(((new Date() as any) - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

//

/**
 * 문자열 중략
 * ABCDEFG12345 => "ABCDE...12345"
 */
export const ellipsis = (
  address: string | null,
  head: number = 5,
  tail: number = 5,
) => {
  if (!address || head < 0 || tail < 0) {
    return "";
  }
  if (head === 0 || address.length <= head + tail) {
    return address;
  }
  return address.slice(0, head) + "..." + address.slice(-tail);
};

export const formatCrypto = (wei: bigint, decimal: number = 18) => {
  const rawWei = wei;

  const ETH_BASE = new Big(10).pow(decimal);
  const ethBig = new Big(rawWei.toString()).div(ETH_BASE);

  const SMALL_MINIMUM = new Big(0.01);
  const isSmallerThanMinimum = ethBig.gt(0) && ethBig.lt(SMALL_MINIMUM);

  const eth = isSmallerThanMinimum ? "<0.01" : ethBig.toFixed(0);

  let formatted: string;
  if (isSmallerThanMinimum) {
    formatted = "<0.01";
  } else {
    formatted = formatAbbreviated(ethBig);
  }

  return {
    wei: rawWei,
    eth,
    formatted,
  };
};
