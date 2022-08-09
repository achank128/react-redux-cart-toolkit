import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { caculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading, isError } = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.modal.isOpen);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(caculateTotals());
  }, [cartItems]);

  if (isError) {
    return (
      <div className="loading">
        <h1>Error</h1>
      </div>
    );
  }

  return isLoading ? (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  ) : (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
