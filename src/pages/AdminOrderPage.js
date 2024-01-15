import NavBar from "../features/nav/navbar";
import AdminOrders from "../features/admin /components/AdminOrders";

function AdminOrdersPage() {
  return (
    <div>
      <NavBar>
        <AdminOrders></AdminOrders>
      </NavBar>
    </div>
  );
}

export default AdminOrdersPage;
