'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// タイピングアニメーションコントローラー
interface TextLine {
  text: string
  delay: number
  highlight?: 'yellow'
  underline?: 'red'
  emphasis?: boolean
  circle?: boolean
  large?: boolean
  mt?: string
}

export default function HeroSection() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const writingSound = useRef<HTMLAudioElement | null>(null)
  
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // テキストデータ
  const textLines: TextLine[] = [
    { text: '危険物取扱者全種全類（化学）、', delay: 0, highlight: 'yellow' },
    { text: 'X線作業主任者（物理学）、', delay: 500, highlight: 'yellow' },
    { text: '菌類の研究者（生物学）', delay: 1000, highlight: 'yellow' },
    { text: 'それらの称号を若干16歳、', delay: 2000, underline: 'red', mt: 'mt-4' },
    { text: '高校一年生で取得した、自分なら。', delay: 2500 },
    { text: '――その私なら、解明できない', delay: 3500, emphasis: true, large: true, mt: 'mt-6' },
    { text: '自然現象など、存在しない。', delay: 4000, emphasis: true, large: true },
    { text: 'その謎、私が解明して見せる！', delay: 5000, circle: true, mt: 'mt-6' },
    { text: 'そう思い立った、高校二年生。', delay: 6000, mt: 'mt-4' }
  ]

  // 音声ファイルの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      writingSound.current = new Audio('/sounds/pencil writing.mp4')
      if (writingSound.current) {
        writingSound.current.volume = 0.1
      }
    }
  }, [])

  // Intersection Observerでアニメーション開始
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isAnimating) {
            startAnimation()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [isAnimating])

  const startAnimation = () => {
    setIsAnimating(true)
    
    textLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index])
        
        // 書いている音を再生（3文字ごと）
        if (index % 3 === 0 && writingSound.current) {
          writingSound.current.currentTime = 0
          writingSound.current.play().catch(() => {})
        }
      }, line.delay)
    })
  }

  // 付箋のドラッグ機能
  const handleStickyDrag = (e: React.MouseEvent, noteId: string) => {
    const note = e.currentTarget as HTMLElement
    const startX = e.clientX - note.offsetLeft
    const startY = e.clientY - note.offsetTop

    const handleMouseMove = (e: MouseEvent) => {
      note.style.left = `${e.clientX - startX}px`
      note.style.top = `${e.clientY - startY}px`
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // テキストの装飾を適用する関数
  const renderTextWithDecoration = (line: TextLine, index: number) => {
    const { text, highlight, underline, emphasis, circle } = line
    let content = <>{text}</>

    if (highlight === 'yellow') {
      content = <span className="highlight-yellow">{text}</span>
    } else if (underline === 'red') {
      content = <>
        {text.split('若干16歳').map((part, i) => (
          i === 0 ? <span key={i}>{part}</span> : 
          <span key={i}><span className="underline-red">若干16歳</span>{part}</span>
        ))}
      </>
    } else if (emphasis) {
      content = <>
        {text.includes('解明できない') 
          ? text.split('解明できない').map((part, i) => (
              i === 0 ? <span key={i}>{part}</span> :
              <span key={i}><span className="emphasis">解明できない</span>{part}</span>
            ))
          : <span className="emphasis">{text}</span>
        }
      </>
    } else if (circle) {
      content = <span className="pen-circle">{text}</span>
    }

    return content
  }

  return (
    <motion.section 
      ref={heroRef}
      className="hero-section"
      id="hero"
      style={{ opacity }}
    >
      {/* 方眼ノートの背景 */}
      <div className="notebook-background">
        <div className="grid-lines"></div>
        <div className="notebook-holes">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* メインコンテンツ */}
      <div className="hero-content">
        {/* コーヒーの染み */}
        <motion.div 
          className="coffee-stain" 
          data-tooltip="2020.4.15 深夜の調査中"
          role="img" 
          aria-label="コーヒーの染み"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <filter id="roughPaper">
              <feTurbulence baseFrequency="0.04" result="noise" numOctaves="5"/>
              <feColorMatrix in="noise" type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 .5 .5 .7 1"/>
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="0.8"/>
            </filter>
            <ellipse cx="75" cy="75" rx="65" ry="60" 
                    fill="#D4A574" 
                    opacity="0.3" 
                    filter="url(#roughPaper)"/>
            <ellipse cx="70" cy="70" rx="55" ry="50" 
                    fill="#C19660" 
                    opacity="0.2"/>
          </svg>
        </motion.div>
        
        {/* メインテキストエリア */}
        <div className="handwritten-text" id="mainText">
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              className={`text-line ${line.large ? 'text-large' : ''} ${line.mt || ''} ${
                visibleLines.includes(index) ? 'visible' : ''
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={visibleLines.includes(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {renderTextWithDecoration(line, index)}
            </motion.p>
          ))}
        </div>
        
        {/* 付箋 */}
        <motion.div 
          className="sticky-note sticky-note-1"
          data-angle="-3"
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}
          onMouseDown={(e) => handleStickyDrag(e, 'note1')}
        >
          <div className="sticky-content">
            <p>255ha = 東京ドーム約54個分！</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="sticky-note sticky-note-2"
          data-angle="2"
          initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}
          onMouseDown={(e) => handleStickyDrag(e, 'note2')}
        >
          <div className="sticky-content">
            <p>家賃35,000円<br/>食費は自給自足</p>
          </div>
        </motion.div>
        
        {/* 署名 */}
        <motion.div 
          className="signature-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7, duration: 1 }}
        >
          <svg className="signature" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M20,60 Q40,40 60,50 T90,55 Q110,45 130,60 L140,40 Q150,50 160,45 T180,50" 
              stroke="#2C2C2C" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 7.5, duration: 2, ease: "easeOut" }}
            />
            <text x="85" y="75" fontFamily="Klee One" fontSize="12" fill="#6B6B6B">2020.4.1</text>
          </svg>
        </motion.div>
        
        {/* 装飾要素 */}
        <div className="pencil-mark pencil-mark-1"></div>
        <div className="eraser-dust"></div>
      </div>
      
      {/* スクロールインジケーター */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="scroll-text">続きを読む</div>
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </motion.section>
  )
}
