'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// 標本データの型
interface Specimen {
  id: number
  name: string
  scientificName: string
  type: 'insect' | 'fungus' | 'plant'
  discoveryDate: string
  location: string
  thumbnail: string
  description: string
  characteristics: string[]
  status: 'new-species' | 'rare' | 'endemic' | 'unknown'
  catalogNumber: string
  color: string
}

// 標本データ
const specimens: Specimen[] = [
  {
    id: 1,
    name: '深山光翅蝶',
    scientificName: 'Luminoptera miyamensis',
    type: 'insect',
    discoveryDate: '2020.05.12',
    location: '東部原生林・標高320m',
    thumbnail: '🦋',
    description: '翅に独特の発光器官を持つ新種の蝶。夜間に青白い光を放つ。',
    characteristics: ['体長: 45-52mm', '翅の発光器官', '夜行性', 'LED様の点滅パターン'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-001',
    color: '#5F9EA0'
  },
  {
    id: 2,
    name: '巨大地底甲虫',
    scientificName: 'Megascarabaeus subterraneus',
    type: 'insect',
    discoveryDate: '2020.06.23',
    location: '地下洞窟系・深度15m',
    thumbnail: '🪲',
    description: '体長8cmを超える巨大な甲虫。完全な暗闇で生活し、独特の反響定位能力を持つ。',
    characteristics: ['体長: 82-95mm', '反響定位器官', '無眼', '硬質外骨格'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-002',
    color: '#2F4F4F'
  },
  {
    id: 3,
    name: '虹色繊維菌',
    scientificName: 'Iridofibra prismatica',
    type: 'fungus',
    discoveryDate: '2020.07.08',
    location: '湿地帯・倒木群生地',
    thumbnail: '🍄',
    description: '光の角度により7色に変化する繊維状の菌糸を形成。新しい構造色のメカニズムを持つ。',
    characteristics: ['菌糸直径: 0.1-0.3mm', '構造色変化', 'pH指示薬性質', '共生細菌保有'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-001',
    color: '#9370DB'
  },
  {
    id: 4,
    name: '記憶樹皮蜘蛛',
    scientificName: 'Cortexaranea memorialis',
    type: 'insect',
    discoveryDate: '2020.08.15',
    location: '古代樹群・樹冠部',
    thumbnail: '🕷️',
    description: '樹皮と完全に同化する擬態能力を持ち、巣の配置に驚異的な幾何学的規則性を示す。',
    characteristics: ['体長: 15-18mm', '完全樹皮擬態', '黄金比の巣', '10年以上の寿命'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-003',
    color: '#8B4513'
  },
  {
    id: 5,
    name: '発電菌類複合体',
    scientificName: 'Electromyces aggregatus',
    type: 'fungus',
    discoveryDate: '2020.09.03',
    location: '鉱物露出地帯',
    thumbnail: '⚡',
    description: '金属イオンを利用して微弱な電流を生成する菌類群。集合体で最大0.8Vを発生。',
    characteristics: ['コロニー直径: 30-50cm', '電圧: 0.3-0.8V', '金属イオン濃縮', 'バイオ電池応用可能'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-002',
    color: '#FFD700'
  },
  {
    id: 6,
    name: '霧生成カマキリ',
    scientificName: 'Nebulomantis generator',
    type: 'insect',
    discoveryDate: '2020.10.20',
    location: '高地草原・標高450m',
    thumbnail: '🦗',
    description: '特殊な器官から微細な水滴を放出し、周囲に霧を発生させて身を隠す。',
    characteristics: ['体長: 65-75mm', '霧生成器官', '1日3L水分放出', '高湿度環境創出'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-004',
    color: '#B0E0E6'
  },
  {
    id: 7,
    name: '時計回り渦巻貝',
    scientificName: 'Chronospiralis dextrorsa',
    type: 'insect',
    discoveryDate: '2020.11.11',
    location: '渓流域・急流部',
    thumbnail: '🐌',
    description: '殻の成長が厳密に24時間周期を示し、年輪のように日数を記録する陸生貝類。',
    characteristics: ['殻径: 25-30mm', '24時間成長周期', '最長記録: 12年', '環境指標種'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-005',
    color: '#DDA0DD'
  },
  {
    id: 8,
    name: '共生発光菌',
    scientificName: 'Symbiolux multiformis',
    type: 'fungus',
    discoveryDate: '2021.01.05',
    location: '洞窟入口付近',
    thumbnail: '✨',
    description: '昆虫の体内で共生し、宿主に発光能力を付与する特殊な菌類。',
    characteristics: ['胞子径: 5-8μm', '共生率: 95%', '発光波長: 495-570nm', '宿主特異性高'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-003',
    color: '#7FFF00'
  },
  {
    id: 9,
    name: '結晶翅蜻蛉',
    scientificName: 'Crystalloptera vitrea',
    type: 'insect',
    discoveryDate: '2021.02.28',
    location: '清流域・水晶露頭付近',
    thumbnail: '🦟',
    description: '翅が水晶のような透明な結晶構造を持ち、光を複雑に屈折させる。',
    characteristics: ['体長: 38-42mm', '結晶質翅構造', '光学迷彩効果', '紫外線視覚'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-006',
    color: '#E0FFFF'
  },
  {
    id: 10,
    name: '地磁気感知蟻',
    scientificName: 'Magnetoformica navigator',
    type: 'insect',
    discoveryDate: '2021.04.10',
    location: '磁鉄鉱露頭地帯',
    thumbnail: '🐜',
    description: '体内に磁鉄鉱の微粒子を持ち、地磁気を感知して正確な方角を把握する。',
    characteristics: ['体長: 8-12mm', '磁気感知器官', '誤差±2度', '10km圏内帰巣能力'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-007',
    color: '#696969'
  },
  {
    id: 11,
    name: '音波通信茸',
    scientificName: 'Sonofungus communicata',
    type: 'fungus',
    discoveryDate: '2021.05.20',
    location: '静寂の森・中心部',
    thumbnail: '🔊',
    description: '超音波領域で他の個体と通信する能力を持つ。地下の菌糸ネットワークで情報を共有。',
    characteristics: ['傘径: 5-15cm', '周波数: 20-40kHz', '通信距離: 500m', '群体知能保有'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-004',
    color: '#4B0082'
  },
  {
    id: 12,
    name: '液体金属蝶',
    scientificName: 'Mercurialis metamorpha',
    type: 'insect',
    discoveryDate: '2021.07.07',
    location: '特殊鉱物地帯・水銀泉付近',
    thumbnail: '🦋',
    description: '翅の鱗粉が水銀様の性質を示し、形状を自在に変化させることができる。',
    characteristics: ['体長: 55-65mm', '可変翅形状', '水銀様鱗粉', '温度感応性'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-008',
    color: '#C0C0C0'
  },
  {
    id: 13,
    name: '量子もつれ双子菌',
    scientificName: 'Quantumyces entanglus',
    type: 'fungus',
    discoveryDate: '2021.08.30',
    location: '磁場異常地点',
    thumbnail: '👥',
    description: '分離された個体間で同期的な成長を示す。量子生物学的現象の可能性。',
    characteristics: ['同期率: 99.7%', '最大分離距離: 1km', '成長同期', '環境応答共有'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-005',
    color: '#9932CC'
  },
  {
    id: 14,
    name: '永久氷晶蛾',
    scientificName: 'Cryomoth perpetua',
    type: 'insect',
    discoveryDate: '2021.10.15',
    location: '恒温地帯・氷点下ポケット',
    thumbnail: '❄️',
    description: '体温が常に0℃以下に保たれ、体表に美しい氷の結晶を形成する。',
    characteristics: ['体長: 28-35mm', '体温: -2〜-5℃', '氷晶形成能', '不凍タンパク質'],
    status: 'new-species',
    catalogNumber: 'MYM-INS-009',
    color: '#87CEEB'
  },
  {
    id: 15,
    name: '時間遅延胞子菌',
    scientificName: 'Chronospora delayed',
    type: 'fungus',
    discoveryDate: '2021.12.25',
    location: '時間異常観測地点',
    thumbnail: '⏰',
    description: '胞子の発芽が通常の100倍以上遅延する。極めて長期の休眠状態を維持。',
    characteristics: ['休眠期間: 50-200年', '発芽遅延機構', '超低代謝', 'DNA修復機能'],
    status: 'new-species',
    catalogNumber: 'MYM-FUN-006',
    color: '#D2691E'
  }
]

export default function Chapter2Page() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null)
  const [filter, setFilter] = useState<'all' | 'insect' | 'fungus'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const clickSound = useRef<HTMLAudioElement | null>(null)

  // 音声ファイルの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSound.current = new Audio('/sounds/clip-snap.mp3')
      if (clickSound.current) {
        clickSound.current.volume = 0.3
      }
    }
  }, [])

  const filteredSpecimens = specimens
    .filter(specimen => filter === 'all' || specimen.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.discoveryDate).getTime() - new Date(a.discoveryDate).getTime()
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'ja')
      return a.type.localeCompare(b.type)
    })

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
          href="/#chapter-2"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span className="font-klee">目次に戻る</span>
        </Link>
        
        <h1 className="font-klee text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2C2C2C' }}>
          標本コレクション
        </h1>
        <p className="font-klee text-lg text-gray-600">
          発見された新種たち - 100種への挑戦の記録
        </p>
      </motion.div>

      {/* コントロールパネル */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-8 space-y-4"
      >
        {/* フィルター */}
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            {(['all', 'insect', 'fungus'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full font-klee transition-all ${
                  filter === type 
                    ? 'bg-amber-200 text-gray-900 shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'all' && '全ての標本'}
                {type === 'insect' && '🐛 昆虫類'}
                {type === 'fungus' && '🍄 菌類'}
                <span className="ml-2 text-sm">
                  ({specimens.filter(s => type === 'all' || s.type === type).length})
                </span>
              </button>
            ))}
          </div>
          
          {/* ソート */}
          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 rounded-lg bg-gray-100 font-klee"
            >
              <option value="date">発見日順</option>
              <option value="name">名前順</option>
              <option value="type">種類順</option>
            </select>
            
            {/* ビューモード */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <span className="text-sm">□□</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <span className="text-sm">☰</span>
              </button>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-amber-50 rounded-lg p-4 flex flex-wrap gap-6">
          <div>
            <span className="font-klee text-sm text-gray-600">総発見数</span>
            <p className="font-courier text-2xl font-bold text-amber-700">
              {specimens.length} / 100種
            </p>
          </div>
          <div>
            <span className="font-klee text-sm text-gray-600">昆虫類</span>
            <p className="font-courier text-2xl font-bold text-green-700">
              {specimens.filter(s => s.type === 'insect').length}種
            </p>
          </div>
          <div>
            <span className="font-klee text-sm text-gray-600">菌類</span>
            <p className="font-courier text-2xl font-bold text-purple-700">
              {specimens.filter(s => s.type === 'fungus').length}種
            </p>
          </div>
        </div>
      </motion.div>

      {/* 標本ディスプレイ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence mode="wait">
              {filteredSpecimens.map((specimen, index) => (
                <motion.div
                  key={specimen.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {
                    setSelectedSpecimen(specimen)
                    // クリック音を再生
                    if (clickSound.current) {
                      clickSound.current.currentTime = 0
                      clickSound.current.play().catch(() => {})
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* 標本ラベル風ヘッダー */}
                    <div 
                      className="p-4 text-center"
                      style={{ backgroundColor: specimen.color + '20' }}
                    >
                      <div className="text-4xl mb-2">{specimen.thumbnail}</div>
                      <p className="font-courier text-xs text-gray-600">
                        {specimen.catalogNumber}
                      </p>
                    </div>
                    
                    {/* 標本情報 */}
                    <div className="p-4">
                      <h3 className="font-klee font-bold text-sm mb-1 line-clamp-2">
                        {specimen.name}
                      </h3>
                      <p className="font-courier text-xs text-gray-500 italic mb-2">
                        {specimen.scientificName}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{specimen.discoveryDate}</span>
                        {specimen.status === 'new-species' && (
                          <span className="text-red-500 font-bold">NEW!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              {filteredSpecimens.map((specimen, index) => (
                <motion.div
                  key={specimen.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setSelectedSpecimen(specimen)
                    // クリック音を再生
                    if (clickSound.current) {
                      clickSound.current.currentTime = 0
                      clickSound.current.play().catch(() => {})
                    }
                  }}
                  className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{specimen.thumbnail}</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-klee font-bold">{specimen.name}</h3>
                        <span className="font-courier text-sm text-gray-500 italic">
                          {specimen.scientificName}
                        </span>
                      </div>
                      <p className="font-klee text-sm text-gray-600 mt-1">
                        {specimen.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-courier text-xs text-gray-500">
                        {specimen.catalogNumber}
                      </p>
                      <p className="text-xs text-gray-500">{specimen.discoveryDate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* 詳細モーダル */}
      <AnimatePresence>
        {selectedSpecimen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedSpecimen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 標本ラベル風ヘッダー */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 border-b-4 border-amber-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-courier text-sm text-gray-600 mb-2">
                      Specimen #{selectedSpecimen.catalogNumber}
                    </p>
                    <h2 className="font-klee text-3xl font-bold mb-2" style={{ color: '#2C2C2C' }}>
                      {selectedSpecimen.name}
                    </h2>
                    <p className="font-courier text-lg italic text-gray-700">
                      {selectedSpecimen.scientificName}
                    </p>
                  </div>
                  <div className="text-6xl">{selectedSpecimen.thumbnail}</div>
                </div>
              </div>
              
              <div className="p-8">
                {/* 基本情報 */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">発見日</h3>
                    <p className="font-klee">{selectedSpecimen.discoveryDate}</p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">発見場所</h3>
                    <p className="font-klee">{selectedSpecimen.location}</p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">分類</h3>
                    <p className="font-klee">
                      {selectedSpecimen.type === 'insect' ? '昆虫類' : '菌類'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">ステータス</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-klee ${
                      selectedSpecimen.status === 'new-species' ? 'bg-red-100 text-red-700' :
                      selectedSpecimen.status === 'rare' ? 'bg-yellow-100 text-yellow-700' :
                      selectedSpecimen.status === 'endemic' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedSpecimen.status === 'new-species' && '新種'}
                      {selectedSpecimen.status === 'rare' && '希少種'}
                      {selectedSpecimen.status === 'endemic' && '固有種'}
                      {selectedSpecimen.status === 'unknown' && '分類不明'}
                    </span>
                  </div>
                </div>
                
                {/* 説明 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    概要
                  </h3>
                  <p className="font-klee text-gray-700 leading-relaxed">
                    {selectedSpecimen.description}
                  </p>
                </div>
                
                {/* 特徴 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    主な特徴
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedSpecimen.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span className="font-klee text-gray-700">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* フッター */}
                <div className="flex justify-end pt-4 border-t">
                  <button
                    className="font-klee px-6 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                    onClick={() => setSelectedSpecimen(null)}
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
