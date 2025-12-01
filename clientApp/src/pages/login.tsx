import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, TrendingUp, Building2, CheckCircle, Shield } from 'lucide-react';
import {  isLoggedIn, loginAll } from '../app/Localstorage';
import mainAxios from '../Instance/mainAxios';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    }
  }, []);
  useEffect(() => {
    if (showOtpModal) {
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [showOtpModal]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First, send OTP for login verification
      const otpResponse = await mainAxios.post('/auth/send-otp/', {
        purpose: "login",
        toEmail: email
      });

      if (otpResponse.data.verification_Code) {
        setVerificationCode(otpResponse.data.verification_Code);
        setOtp(['', '', '', '', '', '']); // Reset OTP
        setShowOtpModal(true);
      } else {
        throw new Error('Failed to send OTP');
      }

    } catch (err: any) {
      console.error('OTP send error:', err);
      
      if (err.response?.status === 404) {
        setError('No account found with this email address.');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[A-Z0-9]?$/.test(value)) return; // Only allow single alphanumeric character

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase();
    const pastedCharacters = pastedData.replace(/[^A-Z0-9]/g, '').split('').slice(0, 6);

    if (pastedCharacters.length === 6) {
      const newOtp = [...otp];
      pastedCharacters.forEach((char, index) => {
        newOtp[index] = char;
      });
      setOtp(newOtp);
      inputRefs.current[5]?.focus(); // Focus last input
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyOtpAndLogin = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP code');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      // Verify OTP first
      await mainAxios.post('/auth/verify-otp', {
        otp_code: otpCode,
        verification_code: verificationCode,
        email: email
      });

      // If OTP verification successful, proceed with login
      const loginResponse = await mainAxios.post('/auth/login', {
        email,
        password
      });

      const { access_token, refresh_token, UserInfo } = loginResponse.data;

      // Store tokens and user info
      loginAll(access_token, refresh_token, UserInfo, rememberMe);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (err: any) {
      console.error('OTP verification error:', err);
      
      if (err.response?.status === 404) {
        if (err.response.data.detail === "OTP Not found") {
          setOtpError('Invalid OTP code. Please check and try again.');
        } else if (err.response.data.detail === "OTP Expired") {
          setOtpError('OTP has expired. Please request a new one.');
        } else {
          setOtpError('Verification failed. Please try again.');
        }
      } else if (err.response?.data?.detail) {
        setOtpError(err.response.data.detail);
      } else {
        setOtpError('Verification failed. Please try again.');
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const resendOtp = async () => {
    try {
      setOtpError('');
      const response = await mainAxios.post('/auth/send-otp/', {
        purpose: "login",
        toEmail: email
      });

      if (response.data.verification_Code) {
        setVerificationCode(response.data.verification_Code);
        setOtp(['', '', '', '', '', '']); // Reset OTP boxes
        setOtpError('New verification code sent successfully!');
        
        // Focus first input
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
        
        // Clear success message after 3 seconds
        setTimeout(() => setOtpError(''), 3000);
      }
    } catch (err: any) {
      setOtpError('Failed to resend code. Please try again.');
    }
  };





  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-2xl">
            <div className="text-center lg:text-left">
              {/* Logo */}
              <div onClick={() => window.location.href = "/"} className="cursor-pointer flex items-center justify-center lg:justify-start gap-3 mb-8">
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
                        Sending verification...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </motion.button>
                </div>
              </form>
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

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Verification Required</h3>
              <p className="text-gray-600 mt-2">
                Enter the 6-digit OTP sent to your email
              </p>
            </div>

            {otpError && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                otpError.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {otpError}
              </div>
            )}

            <div className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el:any) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={handleOtpPaste}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-200 uppercase"
                    maxLength={1}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileFocus={{ scale: 1.05, borderColor: "#3b82f6" }}
                  />
                ))}
              </div>


              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={isVerifyingOtp}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={verifyOtpAndLogin}
                  disabled={isVerifyingOtp || otp.join('').length !== 6}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isVerifyingOtp ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Login'
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Login;