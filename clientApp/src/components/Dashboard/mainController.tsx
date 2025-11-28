import { motion, } from 'framer-motion';
import ServiceModal from './ServicesModal/ServicesModal';
import ClientModal from './ClientsModal/ClientsModal';
import BlogManagement from './Blogs/BlogsModal';
// Main Content Component
const MainContent: React.FC<{ activeSection: string }> = ({
    activeSection,
}) => {
    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <>OverView</>
                );

            case 'services':
                return (
                    <ServiceModal />
                );

            case 'clients':
                return (
                    <ClientModal />
                );

            case 'portfolio':
                return (
                    <BlogManagement />
                );

            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Section Under Development</h2>
                        <p className="text-gray-600">This section is currently being updated with new content.</p>
                    </motion.div>
                );
        }
    };

    return (
        <>
            <div className="w-full">
                {renderContent()}
            </div>
        </>
    );
};
export default MainContent