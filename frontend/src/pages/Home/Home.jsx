import Layout from "../../components/layout/Layout";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import BannerArea from "../../components/home/BannerArea";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import NewArrivalProducts from "../../components/home/NewArrivalProducts";
import BannerArea1 from "../../components/home/BannerArea1";
import BannerArea2 from "../../components/home/BannerArea2";

function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <BannerArea />
      <FeaturedProducts/>
      <BannerArea1/>
      <NewArrivalProducts/>
      <BannerArea2/>
    </Layout>
  );
}

export default Home;