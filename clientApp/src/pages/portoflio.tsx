// PortfolioSection.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search, Calendar, User, ArrowLeft, Share2, Clock,
    TrendingUp, Users, BookOpen, Filter, Volume2, VolumeX
} from 'lucide-react';
import PremiumFooter from '../components/footer';
import Navbar from '../components/navbar';
import mainAxios from '../Instance/mainAxios';


// Blog Interface
interface Blog {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    mainText: string;
    user_id: number;
    creator_first_name: string;
    creator_last_name: string;
    created_at: string;
}

// Text-to-Speech Hook
const useTextToSpeech = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const speak = (text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            console.warn('Text-to-speech not supported in this browser');
            return;
        }

        // Stop any current speech
        window.speechSynthesis.cancel();

        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utterance.onpause = () => {
            setIsPaused(true);
        };

        utterance.onresume = () => {
            setIsPaused(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setIsPaused(false);
    };

    const pause = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resume = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    };

    const toggle = (text: string) => {
        if (isPlaying) {
            if (isPaused) {
                resume();
            } else {
                pause();
            }
        } else {
            speak(text);
        }
    };

    return {
        isPlaying,
        isPaused,
        speak,
        pause,
        resume,
        stop,
        toggle
    };
};

// Components
const BlogCard = ({ blog, onClick }: any) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const truncateText = (text: string, length: number) => {
        const plainText = stripHtml(text);
        return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-[#d4af37]/30 transition-all  cursor-pointer group shadow-sm hover:shadow-md"
            onClick={() => onClick(blog)}
        >
            <div className="relative overflow-hidden">
                <img
                    src={blog.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80'}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-4 left-4">
                    <span className="bg-[#d4af37] text-white px-2 py-1 rounded text-sm font-semibold">
                        Blog Post
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                    {blog.title}
                </h3>
                {blog.subtitle && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{blog.subtitle}</p>
                )}

                <div
                    className="text-gray-500 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                        __html: truncateText(blog.mainText, 120)
                    }}
                />

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{blog.creator_first_name} {blog.creator_last_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.created_at)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#d4af37] font-semibold">
                        <BookOpen className="w-4 h-4" />
                        <span>Read More</span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const BlogDetail = ({ blog, onBack }: any) => {
    const navigate = useNavigate();
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const { isPlaying, isPaused, toggle, stop } = useTextToSpeech();

    useEffect(() => {
        fetchRelatedBlogs();

        // Cleanup speech synthesis on unmount
        return () => {
            stop();
        };
    }, [blog]);

    const fetchRelatedBlogs = async () => {
        try {
            const response = await mainAxios.get('/blogs/');
            const otherBlogs = response.data
                .filter((b: Blog) => b.id !== blog.id)
                .slice(0, 3);
            setRelatedBlogs(otherBlogs.map((blog: any) => ({
                ...blog,
                image: blog.image ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}` : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80'
            })))
        } catch (error) {
            console.error('Error fetching related blogs:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const normalized = dateString.replace(" ", "T") + "Z";
        const d = new Date(normalized);

        if (isNaN(d.getTime())) return "Invalid Date";

        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    const shareBlog = () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.subtitle,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const getReadableText = () => {
        const title = blog.title || '';
        const subtitle = blog.subtitle || '';
        const mainText = blog.mainText ? blog.mainText.replace(/<[^>]*>/g, ' ') : '';
        return `${title}. ${subtitle}. ${mainText}`;
    };

    const handleTextToSpeech = () => {
        toggle(getReadableText());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar isFull={true} />
            
            {/* Blog Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Blogs</span>
                        </button>

                        <div className="flex items-center gap-4">
                            {/* Text-to-Speech Button */}
                            <button
                                onClick={handleTextToSpeech}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${isPlaying
                                    ? 'bg-[#d4af37] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                title={isPlaying ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Read aloud'}
                            >
                                {isPlaying && !isPaused ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                                <span>{isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Read Aloud'}</span>
                            </button>

                            <button
                                onClick={shareBlog}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <article className="bg-white rounded-lg shadow-sm">
                            {/* Featured Image */}
                            {blog.image && (
                                <div className="w-full h-64 md:h-96 overflow-hidden rounded-t-lg">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-6 md:p-8">
                                {/* Blog Meta */}
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        <span>By {blog.creator_first_name} {blog.creator_last_name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(blog.created_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>5 min read</span>
                                    </div>
                                </div>

                                {/* Blog Title */}
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {blog.title}
                                </h1>

                                {blog.subtitle && (
                                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                        {blog.subtitle}
                                    </p>
                                )}

                                {/* Blog Content */}
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: blog.mainText }}
                                />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* About Author */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-white font-semibold">
                                        {blog.creator_first_name?.[0]}{blog.creator_last_name?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {blog.creator_first_name} {blog.creator_last_name}
                                        </p>
                                        <p className="text-sm text-gray-500">Financial Expert</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Experienced financial consultant with expertise in tax optimization,
                                    business development, and financial strategy.
                                </p>
                            </div>

                            {/* Related Blogs */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Blogs</h3>
                                <div className="space-y-4">
                                    {relatedBlogs.map((relatedBlog) => (
                                        <div
                                            key={relatedBlog.id}
                                            className="flex gap-3 cursor-pointer group"
                                            onClick={() => navigate(`/portfolio/${encodeURIComponent(relatedBlog.title.toLowerCase().replace(/ /g, '-'))}-${relatedBlog.id}`)}
                                        >
                                            <img
                                                src={relatedBlog.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.1&auto=format&fit=crop&w=100&q=80'}
                                                alt={relatedBlog.title}
                                                className="w-16 h-16 object-cover rounded flex-shrink-0"
                                            />
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                                                    {relatedBlog.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDate(relatedBlog.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-lg p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                                <p className="text-sm opacity-90 mb-4">
                                    Get the latest financial insights and business tips delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-3 py-2 rounded text-gray-900 text-sm placeholder-gray-500"
                                    />
                                    <button className="w-full bg-white text-[#d4af37] py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PremiumFooter />
        </div>
    );
};

const PortfolioFilters = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }: any) => {
    const filters = ["All", "Business", "Finance", "Tax", "Investment", "Strategy"];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search Only - Filters are hidden */}
                <div className="relative flex-1 w-full lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] border border-gray-200"
                    />
                </div>

                {/* Filters Section - Hidden */}
                <div className="hidden flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-4 py-2 rounded-full font-semibold transition-colors border flex items-center gap-2 ${activeFilter === filter
                                ? 'bg-[#d4af37] text-white border-[#d4af37]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#d4af37] hover:text-[#d4af37]'
                                }`}
                        >
                            {activeFilter === filter && <Filter className="w-4 h-4" />}
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => (
    <div className="relative bg-gray-900 min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80')"
            }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
                Business Insights & News
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
                Expert financial analysis, business strategies, and market insights from Carino Group
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-300"
            >
                <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#d4af37]" />
                    <span>Latest Business Insights</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#d4af37]" />
                    <span>Market Analysis</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#d4af37]" />
                    <span>Expert Contributors</span>
                </div>
            </motion.div>
        </div>
    </div>
);

// Main Portfolio Section Component
const PortfolioSection = () => {
    const { blogSlug } = useParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (blogSlug && blogs.length > 0) {
            const blogId = parseInt(blogSlug.split('-').pop() || '');
            const blog = blogs.find(b => b.id === blogId);
            if (blog) {
                setSelectedBlog(blog);
            }
        }
    }, [blogSlug, blogs]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await mainAxios.get('/blogs/');
            const blogsData = response.data.map((blog: any) => ({
                ...blog,
                image: blog.image ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}` : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80'
            }));
            setBlogs(blogsData);
        } catch (err: any) {
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBlogClick = (blog: Blog) => {
        const slug = `${blog.title.toLowerCase().replace(/ /g, '-')}-${blog.id}`;
        navigate(`/portfolio/${slug}`);
    };

    const handleBackToList = () => {
        navigate('/portfolio');
        setSelectedBlog(null);
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.mainText.toLowerCase().includes(searchQuery.toLowerCase());

        // Since filters are hidden, always return true for filter matching
        const matchesFilter = true;

        return matchesSearch && matchesFilter;
    });

    if (selectedBlog) {
        return <BlogDetail blog={selectedBlog} onBack={handleBackToList} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <HeroSection />

            <div className="py-12 bg-gray-50">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters and Search - Only search is visible now */}
                    <PortfolioFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Blog Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        blog={blog}
                                        onClick={handleBlogClick}
                                    />
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredBlogs.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
                                </motion.div>
                            )}
                        </>
                    )}

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Blog Impact</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">{blogs.length}+</div>
                                <div className="text-gray-600">Articles Published</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">10K+</div>
                                <div className="text-gray-600">Monthly Readers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">95%</div>
                                <div className="text-gray-600">Reader Satisfaction</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#d4af37]">50+</div>
                                <div className="text-gray-600">Expert Contributors</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <PremiumFooter />
        </div>
    );
};

export default PortfolioSection;