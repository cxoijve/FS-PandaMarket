import {
  coerce,
  object,
  nonempty,
  string,
  min,
  number,
  array,
} from "superstruct";

export const CreateProductRequestStruct = object({
  name: coerce(nonempty(string()), string(), (value) => value.trim()),
  description: nonempty(string()),
  price: min(number(), 0), // integer() 대신 number() 사용 (PostgreSQL에서는 Decimal을 사용할 수도 있음)
  tags: array(nonempty(string())), // PostgreSQL에서는 JSONB 또는 ARRAY 타입 가능
  images: array(nonempty(string())), // 이미지 URL 배열
});
