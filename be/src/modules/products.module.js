const express = require("express");
const prisma = require("../db/prisma/client.prisma");

const productsRouter = express.Router();

/**
 * 상품 등록 (URL: `/items/registration`)
 */
productsRouter.post("/registration", async (req, res, next) => {
  // 변경된 경로
  try {
    const { name, description, price, tags, images } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: price.toString(), // Decimal 변환
        tags,
        images, // 프론트에서 추가된 이미지 그대로 저장
      },
    });

    // 등록된 상품의 ID 반환 (상품 상세 페이지 이동을 위해 필요)
    res.status(201).json({ id: product.id });
  } catch (e) {
    next(e);
  }
});

/**
 * 특정 상품 조회 (URL: `/items/:id`)
 */
productsRouter.get("/:id", async (req, res, next) => {
  // 변경된 경로
  try {
    const productId = parseInt(req.params.id, 10); // 문자열을 정수로 변환

    if (isNaN(productId)) {
      return res.status(400).json({ error: "잘못된 상품 ID입니다." });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        images: true,
        createdAt: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.json({
      ...product,
      price: product.price.toString(), // Decimal 변환
    });
  } catch (e) {
    next(e);
  }
});

/**
 * 전체 상품 목록 조회 (URL: `/items`)
 */
productsRouter.get("/", async (req, res, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "recent";

    const options = {
      skip: offset,
      take: pageSize,
      orderBy: sort === "recent" ? { createdAt: "desc" } : undefined,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    };

    const products = await prisma.product.findMany(options);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

module.exports = productsRouter;
