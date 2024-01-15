import { Link } from "react-router-dom";
import NavBar from "../features/nav/navbar";
import Product from "../features/product-list/product";
import Footer from "../features/comman/footer"
function HomePage() {
  return (
    <div>
      <NavBar>
        <Product>
        </Product>

       
      </NavBar>
      <Footer>
      </Footer>
    </div>
  );
}

export default HomePage;
