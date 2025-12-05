'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!formData.userName.trim()) {
      setError('이름을 입력해주세요');
      return false;
    }

    if (!formData.email.trim()) {
      setError('이메일을 입력해주세요');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식이 아닙니다');
      return false;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다');
      return false;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.signUp({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      // 회원가입 성공 후 로그인 페이지로 이동
      router.push('/login?signup=success');
    } catch (err) {
      setError('회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Concert
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            회원가입
          </h1>
          <p className="text-gray-600">
            콘서트 예약을 시작해보세요
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                이름
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white"
                placeholder="비밀번호 입력"
              />
            </div>

            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white"
                placeholder="비밀번호 재입력"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  회원가입 중...
                </span>
              ) : (
                '회원가입'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold">
                로그인
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            회원가입 시 서비스 이용약관에 동의하게 됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
