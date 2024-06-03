"use server";

import { redirect } from "next/navigation";
import { productRepository } from "../../../_schema/products";
import { EntityId } from "redis-om";

// create products
export async function createProduct(formData) {
  await productRepository.save({
    title: formData.get("title"),
    count: parseInt(formData.get("count")),
    price: parseFloat(formData.get("price")),
    img: formData.get("img"),
    colors: formData.getAll("colors"),
    size: formData.get("size"),
  });

  redirect("./products");
}

// update products
export async function updateProduct(formData) {
  console.log("updateProductCalled");
  const id = formData.get("id");

  const product = await productRepository.fetch(id);

  product.price = parseFloat(formData.get("price"));
  product.count = parseInt(formData.get("count"));

  await productRepository.save(product);
  redirect("./products");
}

// delete products
export async function deleteProduct(id) {
  //   console.log("deleteProductCalled , id ", id);
  await productRepository.remove(id);
  // key : product:id

  redirect("./products");
}

// search products
export async function searchProducts(formData) {
  const text = formData.get("text");
  const colors = formData.getAll("colors");

  // search w/o color filter
  let products;

  if (colors.length < 1) {
    // do only text search
    products = await productRepository
      .search()
      .where("title")
      .matches(text)

      .return.all();
  }

  products = products.map((p) => {
    return {
      ...p,
      id: p[EntityId],
    };
  });

  //   return error if no matches
  if (products.length < 1) {
    return { error: "No search results found" };
  }

  return products;
}
