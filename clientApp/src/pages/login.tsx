import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, TrendingUp, Building2, CheckCircle } from 'lucide-react';
import { isLoggedIn, loginAll } from '../app/Localstorage';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - replace with your actual authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication - replace with real validation
      const validCredentials = [
        { email: 'admin@carino.rw', password: 'admin123', user: {
          id: 1,
          name: 'System Administrator',
          email: 'admin@carino.rw',
          role: 'admin',
          avatar: null
        }},
        { email: 'manager@carino.rw', password: 'manager123', user: {
          id: 2,
          name: 'Operations Manager',
          email: 'manager@carino.rw',
          role: 'manager',
          avatar: null
        }},
        { email: 'user@carino.rw', password: 'user123', user: {
          id: 3,
          name: 'Business Analyst',
          email: 'user@carino.rw',
          role: 'user',
          avatar: null
        }}
      ];

      const credential = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (credential) {
        // Use your loginAll function - it will handle the redirect
        loginAll(
          `mock-jwt-token-${Date.now()}-${credential.user.id}`,
          `mock-refresh-token-${Date.now()}-${credential.user.id}`,
          credential.user,
          rememberMe
        );
        // Redirect to dashboard or show success message
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'manager' | 'user') => {
    const credentials = {
      admin: { email: 'admin@carino.rw', password: 'admin123' },
      manager: { email: 'manager@carino.rw', password: 'manager123' },
      user: { email: 'user@carino.rw', password: 'user123' }
    };
    
    setEmail(credentials[type].email);
    setPassword(credentials[type].password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-2xl">
          <div className="text-center lg:text-left">
            {/* Logo */}
            <div onClick={()=>window.location.href="/"} className="cursor-pointer flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-gray-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CARINO</h1>
                <p className="text-sm text-gray-600">Business Group</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your admin dashboard
            </p>
          </div>

          <div className="mt-8">
            {/* Quick Login Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="px-3 py-4 text-xs bg-primary text-white rounded-lg hover:bg-primary transition-colors"
              >
                Admin
              </button>
              <button
                onClick={() => fillDemoCredentials('manager')}
                className="px-3 py-4 text-xs bg-primary text-white rounded-lg hover:bg-primary transition-colors"
              >
                Manager
              </button>
              <button
                onClick={() => fillDemoCredentials('user')}
                className="px-3 py-4 text-xs bg-primary text-white rounded-lg hover:bg-primary transition-colors"
              >
                User
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full flex justify-center py-5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </div>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2 text-center">Demo Credentials</h4>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <span>admin@carino.rw / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span>Manager:</span>
                  <span>manager@carino.rw / manager123</span>
                </div>
                <div className="flex justify-between">
                  <span>User:</span>
                  <span>user@carino.rw / user123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#f5d67b] opacity-90"></div>
        <div className="relative flex flex-col justify-center items-center px-12 text-white w-full">
          <div className="max-w-md text-center">
            <Building2 className="w-24 h-24 mx-auto mb-8 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">Carino Business Group</h2>
            <p className="text-xl mb-8 opacity-90">
              Streamlining Rwanda's Financial Future with Precision and Excellence
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Comprehensive Financial Solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Tax Consultancy & Planning</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Business Advisory Services</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Accounting & Bookkeeping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;