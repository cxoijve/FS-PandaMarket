import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncErrorHandler } from "./utils/asyncErrorHandler.js";
import { NotFoundException } from "../exceptions/NotFoundException.js";
import { ExceptionMessage } from "../constant/ExceptionMessage.js";

const prisma = new PrismaClient();
export const ProductRouter = express.Router();

/**
 * 상품 등록 API (POST /products)
 */
ProductRouter.post(
  "/",
  asyncErrorHandler(async (req, res) => {
    const { name, description, price, tags, images } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        tags,
        images,
      },
    });

    return res.status(201).json(product);
  })
);

/**
 * 특정 상품 조회 API (GET /products/:productId)
 */
ProductRouter.get(
  "/:productId",
  asyncErrorHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      throw new NotFoundException(ExceptionMessage.PRODUCT_NOT_FOUND);
    }

    return res.json(product);
  })
);

/**
 * 상품 수정 API (PATCH /products/:productId)
 */
ProductRouter.patch(
  "/:productId",
  asyncErrorHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, tags, images } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { name, description, price, tags, images },
    });

    return res.json(updatedProduct);
  })
);

/**
 * 상품 삭제 API (DELETE /products/:productId)
 */
ProductRouter.delete(
  "/:productId",
  asyncErrorHandler(async (req, res) => {
    const { productId } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(productId) },
    });

    return res.status(204).send();
  })
);

/**
 * 상품 목록 조회 API (GET /products)
 */
ProductRouter.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    const { skip = 0, take = 10, orderBy = "recent", word = "" } = req.query;

    const whereClause = word
      ? {
          OR: [
            { name: { contains: word, mode: "insensitive" } },
            { description: { contains: word, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause = orderBy === "recent" ? { createdAt: "desc" } : {};

    const totalCount = await prisma.product.count({ where: whereClause });
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip: parseInt(skip),
      take: parseInt(take),
    });

    return res.json({
      count: totalCount,
      data: products,
    });
  })
);
s;
