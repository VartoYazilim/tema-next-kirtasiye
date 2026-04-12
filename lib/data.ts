import productsJson from "@/data/products.json";
import type { Product } from "@/types";

const products = productsJson as Product[];

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slugs: string[]) {
  return products.filter((product) => slugs.includes(product.slug));
}

export function getCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}

export function getBrands() {
  return Array.from(new Set(products.map((product) => product.brand)));
}

export function getColorTones() {
  return Array.from(new Set(products.map((product) => product.colorTone)));
}
