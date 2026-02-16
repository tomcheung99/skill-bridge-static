'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">Skill Bridge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6"
        >
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            定價
          </Link>
          
          <Link href="/graph" className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            技能圖譜
          </Link>
          
          {session ? (
            <>
              <Link 
                href="/dashboard" 
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                儀表板
              </Link>
              
              <div className="flex items-center gap-3 pl-3 border-l border-white/[0.08]"
              >
                <span className="text-sm text-zinc-400"
                >{session.user.name || session.user.email}</span>
                
                <button
                  onClick={() => signOut()}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  登出
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="px-4 py-2 text-sm bg-white/[0.06] hover:bg-white/[0.1] 
                       text-white rounded-lg border border-white/[0.08] transition-all"
            >
              登入
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.08] py-4"
        >
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4"
          >
            <Link 
              href="/pricing" 
              className="text-zinc-400 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              定價
            </Link>
            
            <Link 
              href="/graph" 
              className="text-zinc-400 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              技能圖譜
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-zinc-400 hover:text-white py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  儀表板
                </Link>
                
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-zinc-400 hover:text-white py-2"
                >
                  登出
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-zinc-400 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                登入
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
