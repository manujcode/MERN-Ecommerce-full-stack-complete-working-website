import ProductForm from "../features/admin /productForm";
import NavBar from "../features/nav/navbar";
import Product from "../features/product-list/product";

function ProductFormpage() {
  return (
    <div>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </div>
  );
}

export default ProductFormpage;
