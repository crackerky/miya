'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// 探検記録のデータ型
interface ExplorationRecord {
  id: number
  title: string
  date: string
  thumbnail: string
  description: string
  pages: number
  findings: string[]
  status: 'completed' | 'ongoing' | 'classified'
  color: string
}

// ダミーデータ
const explorationRecords: ExplorationRecord[] = [
  {
    id: 1,
    title: '東部森林地帯初期調査',
    date: '2020.04.15',
    thumbnail: '🗺️',
    description: '255haの東側約30%を占める原生林の初回調査記録。未踏の領域への第一歩。',
    pages: 48,
    findings: ['未知の洞窟系統', '古代の石標', '特異な植生分布'],
    status: 'completed',
    color: '#4ECDC4'
  },
  {
    id: 2,
    title: '地下水脈探査報告書',
    date: '2020.05.23',
    thumbnail: '💧',
    description: '広大な地下水脈の発見。地下20mに巨大な水系が広がっていることが判明。',
    pages: 72,
    findings: ['3つの地底湖', '希少鉱物の鉱脈', '古代の水路跡'],
    status: 'completed',
    color: '#45B7D1'
  },
  {
    id: 3,
    title: '夜間生態系観察記録',
    date: '2020.06.30',
    thumbnail: '🌙',
    description: '夜間のみ活動する生物群の詳細な観察記録。驚くべき生態系の発見。',
    pages: 56,
    findings: ['発光性菌類群', '夜行性大型昆虫', '未知の夜行性哺乳類'],
    status: 'completed',
    color: '#6C5CE7'
  },
  {
    id: 4,
    title: '古代構造物発掘日誌',
    date: '2020.08.12',
    thumbnail: '🏛️',
    description: '森の奥深くで発見された石造建築群の発掘記録。年代測定の結果は驚異的。',
    pages: 124,
    findings: ['紀元前の建造物', '未解読の文字', '儀式用具と思われる遺物'],
    status: 'ongoing',
    color: '#A8E6CF'
  },
  {
    id: 5,
    title: '高地植物相調査ノート',
    date: '2020.09.20',
    thumbnail: '🌿',
    description: '標高差による植生の変化を詳細に記録。新種の可能性がある植物を多数発見。',
    pages: 88,
    findings: ['固有種の群生地', '薬効成分を持つ植物', '絶滅危惧種の自生地'],
    status: 'completed',
    color: '#FFE66D'
  },
  {
    id: 6,
    title: '冬季環境変化記録',
    date: '2021.01.10',
    thumbnail: '❄️',
    description: '厳冬期における生態系の変化を追跡。予想外の適応メカニズムを確認。',
    pages: 64,
    findings: ['冬眠しない動物群', '氷結しない泉', '冬季限定の菌類'],
    status: 'completed',
    color: '#74B9FF'
  },
  {
    id: 7,
    title: '音響マッピング調査',
    date: '2021.03.15',
    thumbnail: '🔊',
    description: '領域全体の音響特性を調査。特定の場所で異常な音響現象を記録。',
    pages: 42,
    findings: ['自然の音響増幅地点', '超低周波の発生源', '動物の通信ネットワーク'],
    status: 'completed',
    color: '#FD79A8'
  },
  {
    id: 8,
    title: '地質層序解析報告',
    date: '2021.05.08',
    thumbnail: '⛰️',
    description: '地層の詳細な分析により、この土地の形成過程が明らかに。',
    pages: 96,
    findings: ['火山活動の痕跡', '古代海底の証拠', '希少金属の鉱床'],
    status: 'completed',
    color: '#FDCB6E'
  },
  {
    id: 9,
    title: '生物相互作用研究',
    date: '2021.07.22',
    thumbnail: '🔄',
    description: '複雑な生態系ネットワークの解明。予想を超える共生関係を発見。',
    pages: 108,
    findings: ['三者共生系', '未知の花粉媒介システム', '地下菌糸ネットワーク'],
    status: 'ongoing',
    color: '#6C5CE7'
  },
  {
    id: 10,
    title: '気候微小環境調査',
    date: '2021.09.30',
    thumbnail: '🌡️',
    description: '領域内の微気候の詳細なマッピング。特異な気候ポケットを複数発見。',
    pages: 78,
    findings: ['恒温地帯', '霧の発生パターン', '局所的な気流システム'],
    status: 'completed',
    color: '#00B894'
  },
  {
    id: 11,
    title: '秘密の谷発見記録',
    date: '2021.11.11',
    thumbnail: '🏔️',
    description: '地図にない隠れ谷の発見。そこには想像を超える世界が広がっていた。',
    pages: 156,
    findings: ['[データ削除済]', '[アクセス制限]', '[機密指定]'],
    status: 'classified',
    color: '#B83C3C'
  },
  {
    id: 12,
    title: '年間総合観察記録',
    date: '2022.03.31',
    thumbnail: '📊',
    description: '2年間の調査データを統合分析。全体像が少しずつ明らかに。',
    pages: 324,
    findings: ['生態系の全体構造', '季節変動パターン', '未解明領域のマッピング'],
    status: 'ongoing',
    color: '#00CEC9'
  }
]

export default function Chapter1Page() {
  const [selectedRecord, setSelectedRecord] = useState<ExplorationRecord | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing' | 'classified'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const pageFlipSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // ページロードアニメーション
    const timer = setTimeout(() => setIsLoading(false), 500)
    
    // 音声ファイルの初期化
    if (typeof window !== 'undefined') {
      pageFlipSound.current = new Audio('/sounds/page-turn.mp3')
      if (pageFlipSound.current) {
        pageFlipSound.current.volume = 0.3
      }
    }
    
    return () => clearTimeout(timer)
  }, [])

  const filteredRecords = explorationRecords.filter(record => 
    filter === 'all' || record.status === filter
  )

  return (
    <main className="min-h-screen py-24 px-8">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <Link 
          href="/#chapter-1"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span className="font-klee">目次に戻る</span>
        </Link>
        
        <h1 className="font-klee text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2C2C2C' }}>
          探検記録アーカイブ
        </h1>
        <p className="font-klee text-lg text-gray-600">
          255ヘクタールの王国に眠る秘密を解き明かす、2年間の調査記録
        </p>
      </motion.div>

      {/* フィルターボタン */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-4"
      >
        {(['all', 'completed', 'ongoing', 'classified'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-klee transition-all ${
              filter === status 
                ? 'bg-amber-200 text-gray-900 shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' && '全ての記録'}
            {status === 'completed' && '✓ 調査完了'}
            {status === 'ongoing' && '◉ 調査継続中'}
            {status === 'classified' && '🔒 機密指定'}
            <span className="ml-2 text-sm">
              ({explorationRecords.filter(r => status === 'all' || r.status === status).length})
            </span>
          </button>
        ))}
      </motion.div>

      {/* 本棚風グリッド */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => {
                  setSelectedRecord(record)
                  // ページめくり音を再生
                  if (pageFlipSound.current) {
                    pageFlipSound.current.currentTime = 0
                    pageFlipSound.current.play().catch(() => {})
                  }
                }}
                className="cursor-pointer"
              >
                <div 
                  className="relative h-64 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${record.color}ee, ${record.color}99)`,
                  }}
                >
                  {/* 本の背表紙風デザイン */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div>
                      <div className="text-white text-4xl mb-2">{record.thumbnail}</div>
                      <h3 className="font-klee text-white font-bold text-sm leading-tight">
                        {record.title}
                      </h3>
                    </div>
                    
                    <div>
                      <p className="font-courier text-white text-xs opacity-80 mb-1">
                        {record.date}
                      </p>
                      <p className="font-courier text-white text-xs opacity-80">
                        {record.pages}頁
                      </p>
                    </div>
                  </div>
                  
                  {/* ステータスバッジ */}
                  {record.status === 'ongoing' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                  {record.status === 'classified' && (
                    <div className="absolute top-2 right-2">
                      <span className="text-white text-xs">🔒</span>
                    </div>
                  )}
                  
                  {/* 装飾的な要素 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black opacity-20" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-20" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 詳細モーダル */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-8 text-white relative"
                style={{ background: `linear-gradient(135deg, ${selectedRecord.color}ee, ${selectedRecord.color}cc)` }}
              >
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
                
                <div className="text-6xl mb-4">{selectedRecord.thumbnail}</div>
                <h2 className="font-klee text-3xl font-bold mb-2">{selectedRecord.title}</h2>
                <p className="font-courier opacity-90">{selectedRecord.date} | {selectedRecord.pages}頁</p>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-klee text-xl font-bold mb-2" style={{ color: '#2C2C2C' }}>
                    概要
                  </h3>
                  <p className="font-klee text-gray-700 leading-relaxed">
                    {selectedRecord.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-klee text-xl font-bold mb-2" style={{ color: '#2C2C2C' }}>
                    主な発見
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecord.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span className="font-klee text-gray-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className={`px-3 py-1 rounded-full text-sm font-klee ${
                    selectedRecord.status === 'completed' ? 'bg-green-100 text-green-700' :
                    selectedRecord.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedRecord.status === 'completed' && '調査完了'}
                    {selectedRecord.status === 'ongoing' && '調査継続中'}
                    {selectedRecord.status === 'classified' && '機密指定'}
                  </span>
                  
                  <button
                    className="font-klee text-amber-600 hover:text-amber-700 transition-colors"
                    onClick={() => setSelectedRecord(null)}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
