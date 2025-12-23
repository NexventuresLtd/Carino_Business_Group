// blogs/BlogManagement.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, User,
    ArrowBigRight
} from 'lucide-react';
import mainAxios from '../../Instance/mainAxios';
import { useNavigate } from 'react-router-dom';

interface Blog {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    mainText: string;
    user_id: number;
    creator_first_name: string;
    creator_last_name: string;
}

export default function Blogsslider() {
    const [blogs, setBlogs] = useState<Blog[]>([]);


    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);


    const fetchBlogs = async () => {
        try {
            const response = await mainAxios.get('/blogs/');
            const blogsData = response.data.map((blog: any) => ({
                ...blog,
                image: blog.image ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}` : ''
            }));

            setBlogs(blogsData);

        } catch (err: any) {

            console.error('Error fetching blogs:', err);
        } finally {

        }
    };






    // FIXED: Function to truncate HTML content while preserving formatting
    const truncateHtml = (html: string, length: number) => {
        // Create a temporary element to parse HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Get text content for length calculation
        const textContent = temp.textContent || temp.innerText || '';

        if (textContent.length <= length) {
            return html; // Return original HTML if within length
        }

        // Truncate the text content
        const truncatedText = textContent.substring(0, length) + '...';

        // Return the truncated text (you could implement more sophisticated HTML truncation here)
        return truncatedText;
    };
    const navigate = useNavigate();
    const handleBlogClick = (blog: Blog) => {
        const slug = `${blog.title.toLowerCase().replace(/ /g, '-')}-${blog.id}`;
        navigate(`/blog/${slug}`);
    };
    return (
        <>
            <div className="max-w-11/12 m-auto">
                <div className="flex justify-center gap-3 flex-col">
                    <span className="text-center block text-primary uppercase font-bold">Financial articles</span>
                    <h3 className='text-4xl font-bold poppins text-center'>Intresting News</h3>
                </div>
                <button className='py-3 ml-auto flex gap-2 cursor-pointer hover:underline underline-offset-8 text-primary' onClick={() => window.location.href = "/blog"}>View all Blogs <ArrowBigRight /></button>

                {/* Blogs Grid */}
                {blogs.length === 0 ? (
                    <div className="bg-white rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {blogs.slice(0, 4).map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg overflow-hidden cursor-pointer"
                                    onClick={() => handleBlogClick(blog)}
                                >
                                    {/* Blog Image */}
                                    {blog.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`${blog.image}`}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-4">
                                        <div className="mb-3">
                                            <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 mb-2">
                                                {blog.title}
                                            </h3>
                                            {blog.subtitle && (
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                                    {blog.subtitle}
                                                </p>
                                            )}
                                            {/* FIXED: Render HTML content properly */}

                                            <div
                                                className="text-gray-500 text-sm line-clamp-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: truncateHtml(blog.mainText, 100)
                                                }}
                                            />
                                        </div>

                                        {/* Creator Info */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{blog.creator_first_name} {blog.creator_last_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </>
    )
}
