'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, AnimatePresence, useTransform } from 'framer-motion'
import Link from 'next/link'

// throttle関数の実装
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

export default function FieldNotesHeader() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showRibbonMenu, setShowRibbonMenu] = useState(false)
  const [lastSection, setLastSection] = useState(0)
  
  const headerRef = useRef<HTMLElement>(null)
  const pageSound = useRef<HTMLAudioElement | null>(null)
  const clipSound = useRef<HTMLAudioElement | null>(null)
  
  const { scrollY, scrollYProgress } = useScroll()
  const totalPages = 255

  // スクロールに応じたブラー効果
  const blurAmount = useTransform(scrollY, [0, 500], [0, 2])

  // 音声ファイルの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pageSound.current = new Audio('/sounds/page-turn.mp3')
      clipSound.current = new Audio('/sounds/clip-snap.mp3')
      
      // 音量設定
      if (pageSound.current) pageSound.current.volume = 0.3
      if (clipSound.current) clipSound.current.volume = 0.5
    }
  }, [])

  // スクロールに基づいてページ番号を更新
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newPage = Math.max(1, Math.ceil(latest * totalPages))
      
      if (newPage !== currentPage) {
        setCurrentPage(newPage)
        
        // セクションが変わったか確認（5ページごと）
        const newSection = Math.floor(newPage / 5)
        if (newSection !== lastSection && pageSound.current) {
          pageSound.current.currentTime = 0
          pageSound.current.play().catch(() => {})
          setLastSection(newSection)
        }
      }
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, currentPage, totalPages, lastSection])

  // ヘッダーの表示/非表示制御
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > lastScrollY && latest > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(latest)
    })
    
    return () => unsubscribe()
  }, [scrollY, lastScrollY])

  // クリップクリック時の処理
  const handleClipClick = useCallback(() => {
    if (clipSound.current) {
      clipSound.current.currentTime = 0
      clipSound.current.play().catch(() => {})
    }
  }, [])

  // ページ番号のフォーマット
  const formatPageNumber = (num: number) => {
    return String(num).padStart(3, '0')
  }

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 h-20 z-[1000] backdrop-blur-sm"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(to bottom, rgba(250, 248, 243, 0.95), rgba(244, 232, 208, 0.9))',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 紙の質感オーバーレイ */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-repeat" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0, 0, 0, 0.02) 10px,
              rgba(0, 0, 0, 0.02) 20px
            )`,
          }}
        />
      </div>

      {/* 紙の破れたエッジ（上部） */}
      <svg
        className="absolute -top-1 left-0 right-0 w-full h-2"
        preserveAspectRatio="none"
        viewBox="0 0 1200 4"
      >
        <path
          d="M0,2 Q30,4 60,2 T120,2 Q150,4 180,2 T240,2 Q270,4 300,2 T360,2 Q390,4 420,2 T480,2 Q510,4 540,2 T600,2 Q630,4 660,2 T720,2 Q750,4 780,2 T840,2 Q870,4 900,2 T960,2 Q990,4 1020,2 T1080,2 Q1110,4 1140,2 T1200,2 L1200,0 L0,0 Z"
          fill="rgba(250, 248, 243, 0.95)"
        />
      </svg>

      {/* メインコンテンツ */}
      <div className="relative flex items-center justify-between h-full px-5 max-w-[1400px] mx-auto">
        {/* クリップ - CSS擬似要素でメタリックな質感 */}
        <motion.div
          className="relative w-10 h-[50px] -ml-2 cursor-pointer clip-metallic"
          whileHover={{ rotate: 2 }}
          whileTap={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={handleClipClick}
        >
          <style jsx>{`
            .clip-metallic::before {
              content: '';
              position: absolute;
              top: 5px;
              left: 10px;
              width: 20px;
              height: 40px;
              background: linear-gradient(90deg, 
                #808080 0%, 
                #C0C0C0 10%, 
                #E8E8E8 20%, 
                #C0C0C0 30%, 
                #C0C0C0 70%, 
                #E8E8E8 80%, 
                #C0C0C0 90%, 
                #808080 100%
              );
              border-radius: 10px 10px 5px 5px;
              box-shadow: 
                inset 0 0 3px rgba(255, 255, 255, 0.8),
                inset -1px 0 2px rgba(0, 0, 0, 0.2),
                inset 1px 0 2px rgba(255, 255, 255, 0.5),
                0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .clip-metallic::after {
              content: '';
              position: absolute;
              top: 35px;
              left: 12px;
              width: 16px;
              height: 10px;
              border: 2px solid #C0C0C0;
              border-bottom: none;
              border-radius: 8px 8px 0 0;
              box-shadow: 
                inset 0 1px 2px rgba(0, 0, 0, 0.2),
                0 1px 0 rgba(255, 255, 255, 0.5);
            }
          `}</style>
        </motion.div>

        {/* タイトル部分 - スクロール時にブラー効果 */}
        <motion.div 
          className="flex-1 text-center"
          style={{ filter: `blur(${blurAmount}px)` }}
        >
          <h1 className="m-0">
            <span className="block font-klee text-2xl font-semibold text-shadow" style={{ color: '#2C2C2C' }}>
              研究ノート No.77
            </span>
            <span className="block font-klee text-sm -mt-0.5" style={{ color: '#6B6B6B', opacity: 0.8 }}>
              ～255haの王国解明記～
            </span>
          </h1>
        </motion.div>

        {/* 右側：ページ番号としおり */}
        <div className="flex items-center gap-5">
          {/* ページカウンター - arutega.jp風 */}
          <div className="font-courier text-base" style={{ color: '#2C2C2C' }}>
            <span className="text-sm">Page</span>
            <motion.span
              key={currentPage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-bold mx-1"
              style={{ color: '#B83C3C' }}
            >
              {formatPageNumber(currentPage)}
            </motion.span>
            <span className="text-sm">/</span>
            <span className="ml-1">255</span>
          </div>

          {/* しおり紐 - 揺れるアニメーション */}
          <div 
            className="relative"
            onMouseEnter={() => setShowRibbonMenu(true)}
            onMouseLeave={() => setShowRibbonMenu(false)}
          >
            <motion.svg
              className="w-[30px] h-[60px] cursor-pointer drop-shadow-md"
              viewBox="0 0 30 60"
              animate={{ 
                rotate: showRibbonMenu ? [0, -2, 2, -2, 0] : 0,
                y: showRibbonMenu ? 5 : 0 
              }}
              transition={{ 
                rotate: {
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: showRibbonMenu ? Infinity : 0,
                  repeatType: "loop"
                },
                y: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
            >
              <defs>
                <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B83C3C" />
                  <stop offset="50%" stopColor="#D14545" />
                  <stop offset="100%" stopColor="#8B2C2C" />
                </linearGradient>
              </defs>
              <path
                d="M15 0 L15 45 L5 55 L15 50 L25 55 L15 45"
                fill="url(#ribbonGradient)"
                stroke="#8B2C2C"
                strokeWidth="1"
              />
            </motion.svg>

            {/* しおりメニュー */}
            <AnimatePresence>
              {showRibbonMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 backdrop-blur-sm border rounded shadow-lg overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(250, 248, 243, 0.95)',
                    borderColor: 'rgba(107, 107, 107, 0.3)',
                  }}
                >
                  {['序章', '第1章', '第2章', '第3章', '第4章'].map((chapter, index) => (
                    <Link
                      key={index}
                      href={`#chapter-${index}`}
                      className="block px-4 py-2 font-klee text-sm whitespace-nowrap transition-colors"
                      style={{ color: '#2C2C2C' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(244, 232, 208, 0.8)'
                        e.currentTarget.style.color = '#B83C3C'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#2C2C2C'
                      }}
                      onClick={() => setShowRibbonMenu(false)}
                    >
                      {chapter}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 紙の破れたエッジ（下部） */}
      <svg
        className="absolute -bottom-1 left-0 right-0 w-full h-2 rotate-180"
        preserveAspectRatio="none"
        viewBox="0 0 1200 4"
      >
        <path
          d="M0,2 Q30,4 60,2 T120,2 Q150,4 180,2 T240,2 Q270,4 300,2 T360,2 Q390,4 420,2 T480,2 Q510,4 540,2 T600,2 Q630,4 660,2 T720,2 Q750,4 780,2 T840,2 Q870,4 900,2 T960,2 Q990,4 1020,2 T1080,2 Q1110,4 1140,2 T1200,2 L1200,0 L0,0 Z"
          fill="rgba(244, 232, 208, 0.9)"
        />
      </svg>
    </motion.header>
  )
}
