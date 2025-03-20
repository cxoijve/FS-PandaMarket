import {
  coerce,
  optional,
  object,
  integer,
  string,
  min,
  max,
  enums,
  nonempty,
  defaulted,
} from "superstruct";

export const GetProductListRequestStruct = object({
  skip: defaulted(
    coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
    0
  ),
  take: defaulted(
    coerce(max(min(integer(), 1), 100), string(), (value) =>
      Number.parseInt(value, 10)
    ), // 최대 100개 제한
    10
  ),
  orderBy: optional(enums(["recent"])), // 최근순 정렬 지원
  word: optional(nonempty(string())), // Prisma의 `contains`를 사용하여 검색 가능
});
