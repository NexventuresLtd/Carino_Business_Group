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
            <ModernFooter/>
        </div>
    )
}

export default HomePage


