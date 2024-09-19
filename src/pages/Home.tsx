import Header from '../components/Header'
import CategoryIcons from '../components/CategoryIcons'
import HeroSection from '../components/HeroSection'
import Navigation from '../components/Navigation'
import OfferSection from '../components/OfferSection'
import images from '../assets/images'
import ShopByCategory from '../components/ShopByCategory'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className=''> 
      <Header/>
      <div className="hidden md:block">
        <Navigation />
      <HeroSection />
      <CategoryIcons />
      <OfferSection
        category="Interesting offer"
        title="Adorn Yourself with the Finest Diamond Jewelry"
        description="Indulge in timeless beauty with our jewelry collection"
        buttonText="Shop Now"
        image1={images.Ring1}
        image2={images.Ring2}
      />
      <OfferSection
        category="You should know"
        title="Elements of Luxury Jewelry Demo"
        description="Explore our exquisite collection of luxury jewelry pieces"
        buttonText="Discover More"
        image1={images.Ring3}
        image2={images.Ring4}
        reversed
      />
      <ShopByCategory />
      {/* <ExploreProducts />
      <Banner />
      <IconSection />
      <JewelleryCollections />
      <LatestLookbook />
      <ClientTestimonials />
      <JewelrySection />
      <NewsletterSubscription />
      <Fotterslider /> */}
      <Footer />



      </div>
    </div>
  )
}

export default Home