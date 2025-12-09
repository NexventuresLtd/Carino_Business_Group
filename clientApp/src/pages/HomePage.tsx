import Blogsslider from "../components/CompsMain/blogsslider"
import ModernFooter from "../components/footer"
import FinanceLandingPage from "../components/MainPages/heroPage"
import ExtendedServicesSection from "../components/MainPages/HomePageExetendServices"
import Navbar from "../components/navbar"


const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <FinanceLandingPage />
            <ExtendedServicesSection />
            <Blogsslider/>
            <ModernFooter/>
        </div>
    )
}

export default HomePage


