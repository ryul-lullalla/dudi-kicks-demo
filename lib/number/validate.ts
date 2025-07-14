import { parseEther, MaxUint256 } from "ethers";
import { math } from "../math";

/**
 * onChange중인 value가 유효한 number값인지 확인합니다.
 * @param value
 * @param maxDecimal
 * @returns boolean
 */
export function validateNumber(value: string, maxDecimal = 18) {
  const numRegex: RegExp = /^\d+$/;
  const invalidStringRegex: RegExp = /\+|\-|e/;
  const valueArr = value.split(".");

  if (isNaN(Number(value))) return false; // . 만 입력 시
  if (invalidStringRegex.test(value)) return false; // +,-,e 포함 시
  if (value === "") return true; // 초기값 ''
  if (valueArr.length > 2) return false; // 3.3.3
  if (Number.isNaN(Number(valueArr[0]))) return false; // 숫자아님

  if (valueArr.length === 2) {
    if (valueArr[1] === "") return true; // 소수점 입력 안 했을 때 '3.'
    if (!numRegex.test(valueArr[1])) return false; // 숫자아님
  }

  if (valueArr[1] && valueArr[1].length > maxDecimal) return false;

  const parsedValue = math(parseEther(value).toString());
  const parsedMax = parseEther(MaxUint256.toString());
  // MaxUint256 이하의 값만 취급
  if (parsedValue.gt(parsedMax)) return false;

  return true;
}

export function validateInteger(value: string) {
  // Accept an empty string so that deletion during editing is not blocked
  if (value === "") return true;

  // Regex explanation:
  // ^            start of string
  // (0|[1-9]\d*)  "0" OR a non-zero digit followed by any digits
  // $            end of string
  // This disallows: +, -, e/E, leading decimal point, or any decimal portion.
  const integerRegex = /^(0|[1-9]\d*)$/;

  return integerRegex.test(value);
}
