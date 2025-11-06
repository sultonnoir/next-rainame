import prisma from "@/server/db";

export const getProducts = async () => {
  const start = Date.now();
  const products = await prisma.product.findMany({
    take: 10,
  });
  const end = Date.now();

  return {
    products,
    duration: end - start,
  };
};
