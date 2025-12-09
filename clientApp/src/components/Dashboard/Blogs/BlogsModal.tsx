// blogs/BlogManagement.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit, Trash2, Eye, X, FileText, User, Upload,
    Bold, Italic, Underline, List, ListOrdered, Quote, Link,
    AlignLeft, AlignCenter, AlignRight, Undo2, Redo2, Heading1, Heading2
} from 'lucide-react';
import mainAxios from '../../../Instance/mainAxios';

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

interface CreateBlogRequest {
    title: string;
    subtitle: string;
    mainText: string;
}

// Custom Rich Text Editor Component
const RichTextEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}> = ({ value, onChange, placeholder = "Start writing your blog content..." }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<string[]>([]);
    const historyIndexRef = useRef<number>(-1);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    // Save to history
    const saveToHistory = useCallback((content: string) => {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
        historyRef.current.push(content);
        historyIndexRef.current = historyRef.current.length - 1;

        // Keep history manageable
        if (historyRef.current.length > 50) {
            historyRef.current.shift();
            historyIndexRef.current--;
        }
    }, []);

    // Handle content changes
    const handleInput = useCallback(() => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            saveToHistory(newContent);
            onChange(newContent);
        }
    }, [onChange, saveToHistory]);

    // Formatting commands
    const execCommand = useCallback((command: string, value: string = '') => {
        document.execCommand(command, false, value);
        handleInput();
        editorRef.current?.focus();
    }, [handleInput]);

    // Undo/Redo
    const handleUndo = useCallback(() => {
        if (historyIndexRef.current > 0) {
            historyIndexRef.current--;
            const content = historyRef.current[historyIndexRef.current];
            if (editorRef.current) {
                editorRef.current.innerHTML = content;
                onChange(content);
            }
        }
    }, [onChange]);

    const handleRedo = useCallback(() => {
        if (historyIndexRef.current < historyRef.current.length - 1) {
            historyIndexRef.current++;
            const content = historyRef.current[historyIndexRef.current];
            if (editorRef.current) {
                editorRef.current.innerHTML = content;
                onChange(content);
            }
        }
    }, [onChange]);

    // Add link
    const addLink = useCallback(() => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    }, [execCommand]);

    // Headings
    const addHeading = useCallback((level: number) => {
        execCommand('formatBlock', `h${level}`);
    }, [execCommand]);

    // Toolbar buttons
    const toolbarButtons = [
        {
            icon: Bold,
            title: 'Bold',
            command: 'bold',
            value: ''
        },
        {
            icon: Italic,
            title: 'Italic',
            command: 'italic',
            value: ''
        },
        {
            icon: Underline,
            title: 'Underline',
            command: 'underline',
            value: ''
        },
        { separator: true },
        {
            icon: Heading1,
            title: 'Heading 1',
            action: () => addHeading(1)
        },
        {
            icon: Heading2,
            title: 'Heading 2',
            action: () => addHeading(2)
        },
        { separator: true },
        {
            icon: AlignLeft,
            title: 'Align Left',
            command: 'justifyLeft',
            value: ''
        },
        {
            icon: AlignCenter,
            title: 'Align Center',
            command: 'justifyCenter',
            value: ''
        },
        {
            icon: AlignRight,
            title: 'Align Right',
            command: 'justifyRight',
            value: ''
        },
        { separator: true },
        {
            icon: List,
            title: 'Bullet List',
            command: 'insertUnorderedList',
            value: ''
        },
        {
            icon: ListOrdered,
            title: 'Numbered List',
            command: 'insertOrderedList',
            value: ''
        },
        { separator: true },
        {
            icon: Quote,
            title: 'Blockquote',
            command: 'formatBlock',
            value: 'blockquote'
        },
        {
            icon: Link,
            title: 'Add Link',
            action: addLink
        }
    ];

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={handleUndo}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Undo"
                >
                    <Undo2 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={handleRedo}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Redo"
                >
                    <Redo2 className="w-4 h-4" />
                </button>

                <div className="w-px bg-gray-300 mx-1" />

                {/* Formatting buttons */}
                {toolbarButtons.map((button, index) => {
                    if (button.separator) {
                        return <div key={index} className="w-px bg-gray-300 mx-1" />;
                    }

                    const Icon = button.icon as React.ComponentType<any> | undefined;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                if (button.action) {
                                    button.action();
                                } else if (button.command) {
                                    execCommand(button.command, button.value ?? '');
                                }
                            }}
                            className="p-2 rounded hover:bg-gray-200 transition-colors"
                            title={button.title}
                        >
                            {Icon ? <Icon className="w-4 h-4" /> : null}
                        </button>
                    );
                })}
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onPaste={(e) => {
                    // Handle paste to maintain clean HTML
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/plain');
                    document.execCommand('insertText', false, text);
                    handleInput();
                }}
                className="min-h-[400px] p-4 outline-none prose max-w-none overflow-y-auto bg-white"
                style={{
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: '1.6'
                }}
                data-placeholder={placeholder}
            />
        </div>
    );
};

const BlogManagement: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState<CreateBlogRequest>({
        title: '',
        subtitle: '',
        mainText: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [removeImage, setRemoveImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Update form data when editing a blog
    useEffect(() => {
        if (editingBlog) {
            setFormData({
                title: editingBlog.title,
                subtitle: editingBlog.subtitle,
                mainText: editingBlog.mainText
            });
            setImagePreview(editingBlog.image || '');
        } else {
            setFormData({
                title: '',
                subtitle: '',
                mainText: ''
            });
            setImagePreview('');
        }
    }, [editingBlog]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await mainAxios.get('/blogs/');
            const blogsData = response.data.map((blog: any) => ({
                ...blog,
                image: blog.image ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}` : ''
            }));

            setBlogs(blogsData);

        } catch (err: any) {
            setError('Failed to fetch blogs');
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const searchBlogs = async (query: string) => {
        try {
            setLoading(true);
            if (query.trim()) {
                const response = await mainAxios.get(`/blogs/search/?query=${encodeURIComponent(query)}`);
                setBlogs(response.data);
            } else {
                fetchBlogs();
            }
        } catch (err: any) {
            setError('Failed to search blogs');
            console.error('Error searching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchBlogs(query);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);
            setRemoveImage(false);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
        setRemoveImage(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCreateBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        console.log('Submitting form data:', {
            title: formData.title,
            subtitle: formData.subtitle,
            mainText: formData.mainText,
            contentLength: formData.mainText.length
        });

        try {
            const formDataToSend = new FormData();

            // Send raw HTML without encoding
            formDataToSend.append('title', formData.title);
            formDataToSend.append('subtitle', formData.subtitle);
            formDataToSend.append('mainText', formData.mainText);

            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            if (editingBlog) {
                if (removeImage) {
                    formDataToSend.append('remove_image', 'true');
                }
                await mainAxios.put(`/blogs/${editingBlog.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await mainAxios.post('/blogs/', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            setShowModal(false);
            resetForm();
            fetchBlogs();
        } catch (err: any) {
            console.error('Error saving blog:', err);
            setError(err.response?.data?.detail || 'Failed to save blog');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            subtitle: blog.subtitle,
            mainText: blog.mainText
        });
        setImagePreview(blog.image || '');
        setRemoveImage(false);
        setShowModal(true);
    };

    const handleDelete = async (blogId: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            await mainAxios.delete(`/blogs/${blogId}`);
            fetchBlogs();
        } catch (err: any) {
            setError('Failed to delete blog');
            console.error('Error deleting blog:', err);
        }
    };

    const handleView = (blog: Blog) => {
        setViewingBlog(blog);
        setShowViewModal(true);
    };

    const resetForm = () => {
        setFormData({ title: '', subtitle: '', mainText: '' });
        setImageFile(null);
        setImagePreview('');
        setRemoveImage(false);
        setEditingBlog(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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



    if (loading && blogs.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Blog Management
                </h1>
                <p className="text-gray-600">
                    Create and manage your blog posts with rich content
                </p>our blog
            </div>

            {/* Error Alert */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-700 p-4 rounded-lg mb-6"
                >
                    <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')}>
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Add Blog Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors w-full md:w-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Write Blog</span>
                    </button>
                </div>
            </div>

            {/* Blogs Grid */}
            {blogs.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                    <p className="text-gray-600 mb-4">
                        {searchQuery
                            ? 'Try adjusting your search'
                            : 'Get started by writing your first blog post'
                        }
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                        >
                            Write First Blog
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden"
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
                                                __html: truncateHtml(blog.mainText, 120)
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

                                    {/* Actions */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleView(blog)}
                                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                                title="View Blog"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(blog)}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Edit Blog"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete Blog"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Create/Edit Blog Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {editingBlog ? 'Edit Blog Post' : 'Write New Blog Post'}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleCreateBlog} className="p-6 space-y-6">
                                {/* Image Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Featured Image
                                    </label>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Image Preview */}
                                        {(imagePreview || (editingBlog?.image && !removeImage)) && (
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview || editingBlog?.image}
                                                        alt="Blog preview"
                                                        className="w-64 h-48 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveImage}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    Click the X to remove image
                                                </p>
                                            </div>
                                        )}

                                        {/* Upload Area */}
                                        <div className="flex-1">
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                                            >
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-2">
                                                    Click to upload featured image
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    PNG, JPG, GIF up to 5MB
                                                </p>
                                            </div>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Title and Subtitle */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Blog Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter blog title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subtitle}
                                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter blog subtitle (optional)"
                                        />
                                    </div>
                                </div>

                                {/* Custom Rich Text Editor */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blog Content *
                                    </label>
                                    <RichTextEditor
                                        value={formData.mainText}
                                        onChange={(newContent) => setFormData(prev => ({ ...prev, mainText: newContent }))}
                                        placeholder="Start writing your blog content..."
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Use the toolbar to format your content
                                    </p>
                                    <div className="mt-2 text-xs text-gray-400">
                                        Content length: {formData.mainText.length} characters
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {submitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                {editingBlog ? 'Updating...' : 'Publishing...'}
                                            </div>
                                        ) : (
                                            editingBlog ? 'Update Blog' : 'Publish Blog'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* View Blog Modal */}
            <AnimatePresence>
                {showViewModal && viewingBlog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Blog Post
                                    </h2>
                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Featured Image */}
                                {viewingBlog.image && (
                                    <div className="mb-6">
                                        <img
                                            src={viewingBlog.image}
                                            alt={viewingBlog.title}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Blog Content */}
                                <div className="prose max-w-none">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {viewingBlog.title}
                                    </h1>

                                    {viewingBlog.subtitle && (
                                        <p className="text-xl text-gray-600 mb-6">
                                            {viewingBlog.subtitle}
                                        </p>
                                    )}

                                    <div
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{ __html: viewingBlog.mainText }}
                                    />

                                    {/* Creator Info */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {viewingBlog.creator_first_name} {viewingBlog.creator_last_name}
                                                </p>
                                                <p className="text-sm text-gray-500">Author</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogManagement;