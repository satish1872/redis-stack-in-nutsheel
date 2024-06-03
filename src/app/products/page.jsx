import { EntityId } from "redis-om";
import { productRepository } from "../../../_schema/products";

// coponentns
import ProductList from "../_components/productList";

const getProducts = async () => {
  let result = await productRepository.search().return.all();
  result = result.map((product) => {
    return {
      ...product,
      id: product[EntityId],
    };
  });

  return result;
};

export default async function Products() {
  const products = await getProducts();

  return (
    <main>
      <header>
        <h2>All Products</h2>
      </header>

      <ProductList products={products} />
    </main>
  );
}
