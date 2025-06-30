'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 章のデータ型
interface ChapterData {
  id: number
  number: string
  title: string
  pages: string
  color: string
  progress: number
  preview: React.ReactNode
  description: string
  stats: string[]
  memo: string
}

// 章データの定義
const chaptersData: ChapterData[] = [
  {
    id: 1,
    number: '',
    title: 'ここには何が眠っているのか',
    pages: '001-084',
    color: '#4ECDC4',
    progress: 67,
    preview: (
      <div className="image-preview">
        <img 
          src="/kingdom-255ha.png" 
          alt="ここには何が眠っているのか"
          className="preview-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
        />
      </div>
    ),
    description: '255ヘクタールの広大な土地に隠された秘密。未知の生態系と古代の痕跡が語る物語。',
    stats: ['🗺️ 詳細地図付き', '📍 GPS座標記録'],
    memo: '歩いた総距離: 823km'
  },
  {
    id: 2,
    number: '',
    title: '昆虫の100の新種があるということは〜菌類の想定新種数〜',
    pages: '085-142',
    color: '#FFE66D',
    progress: 23,
    preview: (
      <div className="image-preview">
        <img 
          src="/insects-collection.png" 
          alt="昆虫の100の新種"
          className="preview-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
        />
      </div>
    ),
    description: '昆虫だけで100種の新種が存在するならば、菌類はどれほどの未知の種を秘めているのか。生態系の驚くべき多様性。',
    stats: ['🔬 顕微鏡写真', '📊 DNA解析データ'],
    memo: 'まだ77種も未発見...'
  },
  {
    id: 3,
    number: '',
    title: 'なぜ80もの古代遺跡が存在する謎',
    pages: '143-255',
    color: '#A8E6CF',
    progress: 19,
    preview: (
      <div className="image-preview">
        <img 
          src="/ruins.png" 
          alt="古代遺跡の謎"
          className="preview-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
        />
      </div>
    ),
    description: '誰が、いつ、何のために？80もの遺跡が集中する理由。謎に包まれた石造建築群が語る古代の真実。',
    stats: ['📐 測量データ', '🗓️ 炭素年代測定'],
    memo: '文明の痕跡...?'
  }
]

export default function TableOfContents() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [readingProgress, setReadingProgress] = useState<Record<number, number>>({})
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [flippingCard, setFlippingCard] = useState<number | null>(null)
  const pageFlipSound = useRef<HTMLAudioElement | null>(null)

  // 音声ファイルの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pageFlipSound.current = new Audio('/sounds/page-flip.mp3')
      if (pageFlipSound.current) {
        pageFlipSound.current.volume = 0.3
      }
      
      // 音声設定を復元
      const savedSoundEnabled = localStorage.getItem('tocSoundEnabled') !== 'false'
      setSoundEnabled(savedSoundEnabled)
      
      // 読書進捗を復元
      const savedProgress = localStorage.getItem('tocReadingProgress')
      if (savedProgress) {
        setReadingProgress(JSON.parse(savedProgress))
      } else {
        // デフォルト値
        setReadingProgress({
          1: 67,
          2: 23,
          3: 19
        })
      }
    }
  }, [])

  // スクロール位置の監視
  useEffect(() => {
    const trackProgress = () => {
      const chapters = document.querySelectorAll('[id^="chapter-"]')
      chapters.forEach(chapter => {
        if (chapter instanceof HTMLElement) {
          const rect = chapter.getBoundingClientRect()
          const height = chapter.offsetHeight
          const visible = Math.max(0, Math.min(height, window.innerHeight - rect.top))
          const ratio = visible / height
        
        if (ratio > 0) {
          const chapterNum = parseInt(chapter.id.split('-')[1])
          const currentProgress = readingProgress[chapterNum] || 0
          const newProgress = Math.min(100, Math.round(ratio * 100))
          
          if (newProgress > currentProgress) {
            setReadingProgress(prev => ({
              ...prev,
              [chapterNum]: newProgress
            }))
            }
          }
        }
      })
    }

    window.addEventListener('scroll', trackProgress)
    return () => window.removeEventListener('scroll', trackProgress)
  }, [readingProgress])

  // 進捗を保存
  useEffect(() => {
    if (Object.keys(readingProgress).length > 0) {
      localStorage.setItem('tocReadingProgress', JSON.stringify(readingProgress))
    }
  }, [readingProgress])

  const handleCardClick = (chapterId: number) => {
    // ページめくりアニメーション
    setFlippingCard(chapterId)
    
    // 音声再生
    if (soundEnabled && pageFlipSound.current) {
      pageFlipSound.current.currentTime = 0
      pageFlipSound.current.play().catch(() => {})
    }
    
    // スクロール
    setTimeout(() => {
      const targetSection = document.querySelector(`#chapter-${chapterId}`)
      if (targetSection) {
        const headerHeight = 80
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
        
        // URLハッシュを更新
        history.pushState(null, '', `#chapter-${chapterId}`)
      }
    }, 600)
    
    // アニメーションリセット
    setTimeout(() => {
      setFlippingCard(null)
    }, 1200)
  }

  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled
    setSoundEnabled(newSoundEnabled)
    localStorage.setItem('tocSoundEnabled', String(newSoundEnabled))
  }

  return (
    <section className="table-of-contents" id="tableOfContents">
      {/* 背景のノート罫線 */}
      <div className="notebook-lines"></div>
      
      {/* セクションヘッダー */}
      <motion.header 
        className="toc-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="toc-title">
          <span className="title-icon">📑</span>
          <span className="title-text">255haへ案内</span>
        </h2>
      </motion.header>
      
      {/* インデックスカードコンテナ */}
      <div className="index-cards-container">
        {chaptersData.map((chapter, index) => {
          const progress = readingProgress[chapter.id] || chapter.progress
          const isFlipping = flippingCard === chapter.id
          const isHovered = hoveredCard === chapter.id
          
          return (
            <motion.article
              key={chapter.id}
              className={`index-card ${chapter.id === 4 ? 'card-final' : ''} ${isFlipping ? 'flipping' : ''}`}
              data-chapter={chapter.id}
              data-pages={chapter.pages}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(chapter.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(chapter.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardClick(chapter.id)
                }
              }}
              role="button"
              aria-label={`${chapter.number} ${chapter.title}へ移動`}
            >
              <div className="card-inner">
                {/* カード前面 */}
                <div className="card-front">
                  <div className="card-header">
                    <h3 className="chapter-number">{chapter.number}</h3>
                    <span 
                      className="bookmark-flag" 
                      style={{ background: chapter.color }}
                    ></span>
                  </div>
                  
                  <h4 className="chapter-title">{chapter.title}</h4>
                  
                  <div className="card-preview">
                    {chapter.preview}
                  </div>
                  
                  <div className="card-meta">
                    <div className="page-range">
                      <span className="page-icon">📄</span>
                      Page: {chapter.pages}
                    </div>
                    
                    <div 
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${chapter.number}の読了率`}
                    >
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                    
                    <div className="progress-text">
                      読了率: <span className="progress-percent">{progress}</span>%
                    </div>
                    
                    {progress === 100 && (
                      <motion.div 
                        className="completion-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        ✓ 読了
                      </motion.div>
                    )}
                  </div>
                  
                  {/* ホバー時の詳細 */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        className="card-tooltip"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="tooltip-content">{chapter.description}</p>
                        <div className="tooltip-stats">
                          {chapter.stats.map((stat, i) => (
                            <span key={i}>{stat}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* カード背面 */}
                <div className="card-back">
                  <div className="card-back-texture"></div>
                </div>
              </div>
              
              {/* 手書きメモ */}
              <motion.div 
                className="handwritten-memo"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                "{chapter.memo}"
              </motion.div>
            </motion.article>
          )
        })}
      </div>
      
      {/* しおり紐 */}
      <motion.div 
        className="ribbon-bookmark"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <svg width="40" height="200" viewBox="0 0 40 200">
          <path d="M20 0 L20 180 L10 190 L20 185 L30 190 L20 180" 
                fill="#B83C3C" 
                stroke="#8B2C2C" 
                strokeWidth="1"/>
        </svg>
      </motion.div>
      
      {/* 音声インジケーター */}
      <motion.div 
        className="sound-indicator"
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sound-icon">🔊</span>
        <span className="sound-text">ページめくり音: {soundEnabled ? 'ON' : 'OFF'}</span>
      </motion.div>
    </section>
  )
}
