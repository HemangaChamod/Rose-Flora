import Header from "./Header";
import Footer from "./Footer";
//import MobileMenu from "./MobileMenu";
//import CartDrawer from "./CartDrawer";

function Layout({ children }) {
  return (
    <>
      <Header />
      {/*<CartDrawer />*/}
      {/*<MobileMenu />*/}

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default Layout;