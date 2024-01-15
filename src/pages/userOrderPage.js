
// import SingleProduct from "../features/auth/component/singleProduct";
import Footer from "../features/comman/footer";
import NavBar from "../features/nav/navbar";
import { Orders } from "../features/user/components/userOrder";


function UserOrderPage() {
  return <div>
   <NavBar >
    <h1 className=" mx-auto flex text-3xl font-bold">My Orders</h1>
    <Orders>
    </Orders>
   </NavBar>
   <Footer>
      </Footer>
  </div>;
}

export default UserOrderPage;


