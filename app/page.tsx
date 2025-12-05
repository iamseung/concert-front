'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl font-medium text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            콘서트 예약
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              더 쉽고 빠르게
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            원하는 콘서트를 간편하게 예약하고
            <br />
            특별한 순간을 만들어보세요
          </p>
        </div>

        {user ? (
          <div className="mt-16 space-y-8">
            {/* Welcome Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
                  {user.userEmail.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-500">안녕하세요</p>
                  <p className="text-xl font-bold text-gray-900">{user.userEmail}</p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-white rounded-3xl p-8 text-left hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  콘서트 목록
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  다양한 콘서트 정보를
                  <br />
                  확인해보세요
                </p>
              </button>

              <button className="bg-white rounded-3xl p-8 text-left hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <span className="text-3xl">🎫</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  내 예약
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  예약한 콘서트를
                  <br />
                  관리하세요
                </p>
              </button>

              <button className="bg-white rounded-3xl p-8 text-left hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  마이페이지
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  내 정보를
                  <br />
                  관리하세요
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-4xl">🎵</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  시작하기
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  로그인하고 다양한 콘서트를
                  <br />
                  예약해보세요
                </p>
              </div>
              <Link
                href="/login"
                className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                로그인하기
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Concert Booking. All rights reserved.
        </p>
      </div>
    </div>
  );
}
