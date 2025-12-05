'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Concert
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                    {user.userEmail.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                    {user.userEmail}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                로그인
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
