import { object, refine, integer, string } from "superstruct";

export const PostgresIdStruct = object({
  productId: refine(
    integer(),
    "PostgresId",
    (value) => Number.isInteger(value) && value > 0
  ),
});
