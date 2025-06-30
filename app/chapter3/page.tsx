'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

// 遺跡データの型
interface Ruin {
  id: number
  name: string
  discoveryDate: string
  location: string
  coordinates: string
  type: 'temple' | 'monument' | 'structure' | 'artifact' | 'unknown'
  era: string
  thumbnail: string
  description: string
  features: string[]
  materials: string[]
  dimensions: string
  status: 'excavated' | 'partial' | 'surveyed' | 'protected'
  mysteries: string[]
  color: string
}

// 遺跡データ
const ruins: Ruin[] = [
  {
    id: 1,
    name: '円環の祭壇',
    discoveryDate: '2020.04.28',
    location: '中央高地・標高380m',
    coordinates: 'N35°42\'15.8" E139°46\'23.4"',
    type: 'temple',
    era: '推定紀元前800-500年',
    thumbnail: '⭕',
    description: '完璧な円形の石組みで構成された祭壇。中心から放射状に12本の石柱が配置。',
    features: ['直径24m', '石柱高さ3.6m', '天文学的配置', '音響効果'],
    materials: ['花崗岩', '水晶片', '未知の合金'],
    dimensions: '直径24m × 高さ3.6m',
    status: 'excavated',
    mysteries: ['音響増幅現象', '磁場異常', '年代特定困難'],
    color: '#8B4513'
  },
  {
    id: 2,
    name: '地下神殿跡',
    discoveryDate: '2020.05.15',
    location: '東部密林・地下12m',
    coordinates: 'N35°41\'52.3" E139°47\'11.8"',
    type: 'temple',
    era: '推定紀元前1200年',
    thumbnail: '🏛️',
    description: '地下に築かれた巨大な神殿構造。保存状態は驚異的に良好。',
    features: ['3層構造', '壁画群', '排水システム', '照明用開口部'],
    materials: ['石灰岩', '大理石', '金箔'],
    dimensions: '東西48m × 南北36m × 深さ18m',
    status: 'partial',
    mysteries: ['建築技術の高度さ', '用途不明の部屋', '音響設計の意図'],
    color: '#2F4F4F'
  },
  {
    id: 3,
    name: '巨石の門',
    discoveryDate: '2020.06.03',
    location: '北部渓谷入口',
    coordinates: 'N35°43\'08.7" E139°45\'55.2"',
    type: 'monument',
    era: '推定紀元前2000年',
    thumbnail: '🚪',
    description: '一枚岩から削り出された巨大な門。重量は推定80トン。',
    features: ['一枚岩構造', '精密な彫刻', '天体記号', '開閉機構の痕跡'],
    materials: ['玄武岩', '石英結晶'],
    dimensions: '高さ12m × 幅8m × 厚さ2.4m',
    status: 'excavated',
    mysteries: ['運搬方法', '加工技術', '門の向こう側'],
    color: '#696969'
  },
  {
    id: 4,
    name: '螺旋の塔基礎',
    discoveryDate: '2020.07.19',
    location: '西部台地',
    coordinates: 'N35°42\'33.5" E139°45\'18.9"',
    type: 'structure',
    era: '推定紀元前600年',
    thumbnail: '🌀',
    description: '螺旋状に上昇する構造の基礎部分。上部構造は失われている。',
    features: ['黄金比螺旋', '7層基礎', '中空構造', '共鳴室'],
    materials: ['安山岩', '銅合金', '水銀痕跡'],
    dimensions: '基底直径32m × 残存高さ8m',
    status: 'partial',
    mysteries: ['完成時の高さ', '螺旋の数学的精度', '音響設計'],
    color: '#9370DB'
  },
  {
    id: 5,
    name: '水晶の祭壇',
    discoveryDate: '2020.08.07',
    location: '清流域・滝壺付近',
    coordinates: 'N35°41\'45.2" E139°46\'52.7"',
    type: 'temple',
    era: '推定紀元前400年',
    thumbnail: '💎',
    description: '巨大な水晶を中心に配置した祭壇。周囲に精密な幾何学模様。',
    features: ['巨大水晶', '光学的配置', '水路システム', '反射装置'],
    materials: ['水晶', '白大理石', '銀装飾'],
    dimensions: '15m × 15m × 高さ6m',
    status: 'excavated',
    mysteries: ['水晶の産地', '光学効果の目的', '儀式の内容'],
    color: '#E0FFFF'
  },
  {
    id: 6,
    name: '星見の台',
    discoveryDate: '2020.09.22',
    location: '最高地点・標高512m',
    coordinates: 'N35°43\'29.8" E139°46\'41.3"',
    type: 'monument',
    era: '推定紀元前1000年',
    thumbnail: '⭐',
    description: '天体観測用と思われる石造プラットフォーム。精密な方位標識。',
    features: ['360度の視界', '星座石板', '暦石', '観測用溝'],
    materials: ['花崗岩', '黒曜石', '隕石片'],
    dimensions: '直径18m × 高さ3m',
    status: 'surveyed',
    mysteries: ['観測精度', '未知の星座', '隕石の由来'],
    color: '#191970'
  },
  {
    id: 7,
    name: '地底回廊網',
    discoveryDate: '2020.10.30',
    location: '全域地下',
    coordinates: '複数地点',
    type: 'structure',
    era: '推定紀元前1500-500年',
    thumbnail: '🕸️',
    description: '領域全体に張り巡らされた地下回廊。総延長は20km以上。',
    features: ['網状構造', '換気システム', '貯蔵室', '逃走経路'],
    materials: ['切石', 'モルタル様物質', '防水処理'],
    dimensions: '総延長20km+ × 高さ2.4m × 幅1.8m',
    status: 'partial',
    mysteries: ['建設目的', '全体像', '他遺跡との接続'],
    color: '#8B4513'
  },
  {
    id: 8,
    name: '音響石群',
    discoveryDate: '2020.11.18',
    location: '南部草原',
    coordinates: 'N35°41\'18.4" E139°47\'05.9"',
    type: 'monument',
    era: '推定紀元前800年',
    thumbnail: '🔊',
    description: '特定の配置で並べられた石群。叩くと楽音を発する。',
    features: ['音階配置', '共鳴効果', '48個の音石', '中央舞台'],
    materials: ['響岩', '共鳴石', '音響結晶'],
    dimensions: '50m × 30m の楕円形配置',
    status: 'excavated',
    mysteries: ['音階体系', '演奏方法', '音響工学の知識'],
    color: '#FF6347'
  },
  {
    id: 9,
    name: '鏡の間',
    discoveryDate: '2021.01.25',
    location: '洞窟内部・第3層',
    coordinates: 'N35°42\'07.1" E139°46\'19.8"',
    type: 'structure',
    era: '推定紀元前300年',
    thumbnail: '🪞',
    description: '高度に研磨された金属板で覆われた地下室。複雑な光の反射。',
    features: ['金属鏡面', '光導入口', '焦点室', '観察窓'],
    materials: ['青銅合金', '水銀アマルガム', '石英レンズ'],
    dimensions: '8m × 8m × 高さ4m',
    status: 'protected',
    mysteries: ['用途', '光学技術', '保存状態の良さ'],
    color: '#C0C0C0'
  },
  {
    id: 10,
    name: '巨人の階段',
    discoveryDate: '2021.02.14',
    location: '北東斜面',
    coordinates: 'N35°43\'21.6" E139°47\'33.2"',
    type: 'structure',
    era: '推定紀元前2500年',
    thumbnail: '🪜',
    description: '通常の3倍の高さを持つ階段。100段が山腹に刻まれている。',
    features: ['巨大段差', '排水溝', '手すり跡', '休憩所'],
    materials: ['花崗岩', '玄武岩'],
    dimensions: '全長300m × 幅12m × 段高60cm',
    status: 'surveyed',
    mysteries: ['使用者の体格', '建設目的', '頂上の施設'],
    color: '#A0522D'
  },
  {
    id: 11,
    name: '時の神殿',
    discoveryDate: '2021.03.30',
    location: '中央盆地',
    coordinates: 'N35°42\'00.0" E139°46\'30.0"',
    type: 'temple',
    era: '年代測定不能',
    thumbnail: '⏰',
    description: '時間に関する装置や記号で満たされた神殿。一部が今も稼働。',
    features: ['水時計', '日時計群', '砂時計室', '振り子装置'],
    materials: ['不明な金属', '永久磁石', '液体水銀'],
    dimensions: '東西60m × 南北45m',
    status: 'partial',
    mysteries: ['稼働し続ける機構', '時間の精度', '動力源'],
    color: '#FFD700'
  },
  {
    id: 12,
    name: '浮遊石の祭壇',
    discoveryDate: '2021.05.05',
    location: '磁場異常地点',
    coordinates: 'N35°42\'48.3" E139°45\'42.1"',
    type: 'artifact',
    era: '推定紀元前1000年',
    thumbnail: '🪨',
    description: '磁気浮上している3つの巨石。古代の反重力技術の可能性。',
    features: ['磁気浮上', '安定機構', '位置制御', '回転運動'],
    materials: ['磁鉄鉱', '未知の合金', '超伝導体？'],
    dimensions: '各石 直径3m × 高さ2m',
    status: 'protected',
    mysteries: ['浮上原理', '古代の技術力', 'エネルギー源'],
    color: '#4B0082'
  },
  {
    id: 13,
    name: '文字の壁',
    discoveryDate: '2021.06.20',
    location: '東部崖面',
    coordinates: 'N35°41\'55.7" E139°47\'28.4"',
    type: 'monument',
    era: '複数時代の重層',
    thumbnail: '📜',
    description: '未解読文字で覆われた巨大な崖面。少なくとも3つの文字体系。',
    features: ['3層の文字', '絵文字混在', '数式らしき記号', '地図状図形'],
    materials: ['岩盤彫刻', '顔料痕跡', '金属象嵌'],
    dimensions: '幅85m × 高さ25m',
    status: 'surveyed',
    mysteries: ['文字体系', '記述内容', '時代の重層'],
    color: '#8B7355'
  },
  {
    id: 14,
    name: '水没宮殿',
    discoveryDate: '2021.08.12',
    location: '地底湖底',
    coordinates: 'N35°42\'22.9" E139°46\'08.5"',
    type: 'temple',
    era: '推定紀元前1800年',
    thumbnail: '🏊',
    description: '地底湖に沈む保存状態の良い宮殿。意図的な水没の可能性。',
    features: ['防水構造', '水中照明', '気密室', '水圧調整'],
    materials: ['耐水石材', '防水モルタル', '真鍮装飾'],
    dimensions: '100m × 80m × 高さ20m',
    status: 'partial',
    mysteries: ['水没の理由', '保存技術', '未探査区域'],
    color: '#4682B4'
  },
  {
    id: 15,
    name: '光の回廊',
    discoveryDate: '2021.09.30',
    location: '水晶洞窟深部',
    coordinates: 'N35°42\'41.2" E139°46\'55.8"',
    type: 'structure',
    era: '推定紀元前500年',
    thumbnail: '💡',
    description: '水晶と鏡を使った光伝送システム。日光を地下深くまで導く。',
    features: ['光ファイバー効果', '増幅装置', '分光室', '集光レンズ'],
    materials: ['天然水晶', '研磨金属', '光学ガラス？'],
    dimensions: '全長500m × 径2m',
    status: 'excavated',
    mysteries: ['光学知識', '製造技術', '使用目的'],
    color: '#FFFACD'
  },
  {
    id: 16,
    name: '風の神殿',
    discoveryDate: '2021.11.11',
    location: '風の通り道',
    coordinates: 'N35°43\'15.0" E139°45\'30.0"',
    type: 'temple',
    era: '推定紀元前700年',
    thumbnail: '🌪️',
    description: '風を制御し増幅する構造。楽器のような音を奏でる。',
    features: ['風洞設計', '共鳴管', '風向制御', '音階調整'],
    materials: ['多孔質岩', '音響石', '風導石'],
    dimensions: '30m × 25m × 高さ15m',
    status: 'excavated',
    mysteries: ['設計原理', '音楽理論', '儀式との関係'],
    color: '#87CEEB'
  }
]

export default function Chapter3Page() {
  const [selectedRuin, setSelectedRuin] = useState<Ruin | null>(null)
  const [filter, setFilter] = useState<'all' | 'temple' | 'monument' | 'structure' | 'artifact'>('all')
  const [viewMode, setViewMode] = useState<'map' | 'timeline' | 'catalog'>('catalog')
  const [sortBy, setSortBy] = useState<'discovery' | 'era' | 'name'>('discovery')
  const pageSound = useRef<HTMLAudioElement | null>(null)

  // 音声ファイルの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pageSound.current = new Audio('/sounds/page-turn.mp3')
      if (pageSound.current) {
        pageSound.current.volume = 0.3
      }
    }
  }, [])

  const filteredRuins = ruins
    .filter(ruin => filter === 'all' || ruin.type === filter)
    .sort((a, b) => {
      if (sortBy === 'discovery') {
        return new Date(b.discoveryDate).getTime() - new Date(a.discoveryDate).getTime()
      }
      if (sortBy === 'era') {
        // 年代順（古い順）
        const getYear = (era: string) => {
          const match = era.match(/紀元前(\d+)/)
          return match ? parseInt(match[1]) : 0
        }
        return getYear(b.era) - getYear(a.era)
      }
      return a.name.localeCompare(b.name, 'ja')
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
          href="/#chapter-3"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span className="font-klee">目次に戻る</span>
        </Link>
        
        <h1 className="font-klee text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2C2C2C' }}>
          古代遺跡カタログ
        </h1>
        <p className="font-klee text-lg text-gray-600">
          80の謎に包まれた遺構群 - なぜこの地に集中しているのか
        </p>
      </motion.div>

      {/* コントロールパネル */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-8 space-y-4"
      >
        {/* ビューモード切替 */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['catalog', 'map', 'timeline'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg font-klee transition-all ${
                  viewMode === mode 
                    ? 'bg-amber-200 text-gray-900 shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {mode === 'catalog' && '📚 カタログ'}
                {mode === 'map' && '🗺️ 地図'}
                {mode === 'timeline' && '📅 年表'}
              </button>
            ))}
          </div>
          
          {/* ソート（カタログビュー時のみ） */}
          {viewMode === 'catalog' && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 rounded-lg bg-gray-100 font-klee"
            >
              <option value="discovery">発見順</option>
              <option value="era">年代順</option>
              <option value="name">名前順</option>
            </select>
          )}
        </div>

        {/* フィルター */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'temple', 'monument', 'structure', 'artifact'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full font-klee text-sm transition-all ${
                filter === type 
                  ? 'bg-amber-200 text-gray-900 shadow' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' && '全て'}
              {type === 'temple' && '🏛️ 神殿'}
              {type === 'monument' && '🗿 記念碑'}
              {type === 'structure' && '🏗️ 構造物'}
              {type === 'artifact' && '💎 遺物'}
              <span className="ml-1">
                ({ruins.filter(r => type === 'all' || r.type === type).length})
              </span>
            </button>
          ))}
        </div>

        {/* 統計情報 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="font-klee text-sm text-gray-600">発見遺跡数</p>
            <p className="font-courier text-2xl font-bold text-amber-700">
              {ruins.length} / 80
            </p>
          </div>
          <div>
            <p className="font-klee text-sm text-gray-600">調査完了</p>
            <p className="font-courier text-2xl font-bold text-green-700">
              {ruins.filter(r => r.status === 'excavated').length}件
            </p>
          </div>
          <div>
            <p className="font-klee text-sm text-gray-600">年代範囲</p>
            <p className="font-courier text-lg font-bold text-purple-700">
              BC2500-BC300
            </p>
          </div>
          <div>
            <p className="font-klee text-sm text-gray-600">未解明</p>
            <p className="font-courier text-2xl font-bold text-red-700">
              {ruins.reduce((acc, r) => acc + r.mysteries.length, 0)}件
            </p>
          </div>
        </div>
      </motion.div>

      {/* メインコンテンツ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {/* カタログビュー */}
        {viewMode === 'catalog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredRuins.map((ruin, index) => (
                <motion.div
                  key={ruin.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSelectedRuin(ruin)
                    // ページめくり音を再生
                    if (pageSound.current) {
                      pageSound.current.currentTime = 0
                      pageSound.current.play().catch(() => {})
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* 遺跡カード */}
                    <div 
                      className="h-32 relative flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${ruin.color}dd, ${ruin.color}88)` 
                      }}
                    >
                      <div className="text-6xl">{ruin.thumbnail}</div>
                      {/* IDタグ */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-courier">
                        #{String(ruin.id).padStart(3, '0')}
                      </div>
                      {/* ステータス */}
                      <div className="absolute top-2 right-2">
                        {ruin.status === 'excavated' && <span className="text-green-400">✓</span>}
                        {ruin.status === 'partial' && <span className="text-yellow-400">◐</span>}
                        {ruin.status === 'surveyed' && <span className="text-blue-400">◎</span>}
                        {ruin.status === 'protected' && <span className="text-red-400">🔒</span>}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-klee text-lg font-bold mb-1" style={{ color: '#2C2C2C' }}>
                        {ruin.name}
                      </h3>
                      <p className="font-klee text-sm text-gray-600 mb-2">{ruin.era}</p>
                      <p className="font-klee text-sm text-gray-700 line-clamp-2 mb-3">
                        {ruin.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-courier text-gray-500">{ruin.location}</span>
                        <span className="text-amber-600 font-bold">
                          謎: {ruin.mysteries.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* 地図ビュー */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-square">
                {/* 簡易地図背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                  <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-200 rounded-full opacity-50" />
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-40 bg-gray-200 rounded-lg opacity-50 transform rotate-12" />
                </div>
                
                {/* 遺跡マーカー */}
                {ruins.map((ruin) => {
                  // 簡易的な位置計算（実際の座標から）
                  const lat = parseFloat(ruin.coordinates.match(/N(\d+)°/)?.[1] || '0')
                  const lng = parseFloat(ruin.coordinates.match(/E(\d+)°/)?.[1] || '0')
                  const x = ((lng - 139) * 100) + '%'
                  const y = ((35.75 - lat) * 200) + '%'
                  
                  return (
                    <motion.div
                      key={ruin.id}
                      className="absolute cursor-pointer"
                      style={{ left: x, top: y }}
                      whileHover={{ scale: 1.5 }}
                      onClick={() => {
                        setSelectedRuin(ruin)
                        // ページめくり音を再生
                        if (pageSound.current) {
                          pageSound.current.currentTime = 0
                          pageSound.current.play().catch(() => {})
                        }
                      }}
                    >
                      <div className="relative">
                        <div className="text-2xl">{ruin.thumbnail}</div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs font-klee bg-white px-1 rounded shadow">
                            {ruin.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            
            {/* 凡例 */}
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow">
              <h4 className="font-klee font-bold text-sm mb-2">凡例</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span>🏛️</span><span className="font-klee">神殿</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🗿</span><span className="font-klee">記念碑</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏗️</span><span className="font-klee">構造物</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💎</span><span className="font-klee">遺物</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 年表ビュー */}
        {viewMode === 'timeline' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="relative">
              {/* 時間軸 */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300" />
              
              {/* 遺跡エントリー */}
              {ruins
                .sort((a, b) => {
                  const getYear = (era: string) => {
                    const match = era.match(/紀元前(\d+)/)
                    return match ? parseInt(match[1]) : 0
                  }
                  return getYear(b.era) - getYear(a.era)
                })
                .map((ruin, index) => (
                  <motion.div
                    key={ruin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative flex items-center mb-8"
                  >
                    {/* 年代マーカー */}
                    <div className="absolute left-4 w-8 h-8 bg-white border-4 border-amber-400 rounded-full" />
                    
                    {/* コンテンツ */}
                    <div 
                      className="ml-16 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: ruin.color + '20' }}
                      onClick={() => {
                        setSelectedRuin(ruin)
                        // ページめくり音を再生
                        if (pageSound.current) {
                          pageSound.current.currentTime = 0
                          pageSound.current.play().catch(() => {})
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{ruin.thumbnail}</div>
                        <div className="flex-1">
                          <h3 className="font-klee font-bold text-lg">{ruin.name}</h3>
                          <p className="font-klee text-sm text-gray-600">{ruin.era}</p>
                          <p className="font-klee text-sm mt-1">{ruin.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* 詳細モーダル */}
      <AnimatePresence>
        {selectedRuin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedRuin(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー */}
              <div 
                className="relative h-48 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedRuin.color}ee, ${selectedRuin.color}aa)` 
                }}
              >
                <div className="text-8xl">{selectedRuin.thumbnail}</div>
                <button
                  onClick={() => setSelectedRuin(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <span className="text-3xl">×</span>
                </button>
                
                {/* ID */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-courier">
                  遺跡 #{String(selectedRuin.id).padStart(3, '0')}
                </div>
              </div>
              
              <div className="p-8">
                {/* タイトル部 */}
                <div className="mb-6">
                  <h2 className="font-klee text-3xl font-bold mb-2" style={{ color: '#2C2C2C' }}>
                    {selectedRuin.name}
                  </h2>
                  <p className="font-klee text-lg text-gray-600">{selectedRuin.era}</p>
                </div>
                
                {/* 基本情報グリッド */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">発見日</h3>
                    <p className="font-klee">{selectedRuin.discoveryDate}</p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">場所</h3>
                    <p className="font-klee">{selectedRuin.location}</p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">座標</h3>
                    <p className="font-courier text-sm">{selectedRuin.coordinates}</p>
                  </div>
                  <div>
                    <h3 className="font-klee font-bold text-sm text-gray-500 mb-1">規模</h3>
                    <p className="font-klee">{selectedRuin.dimensions}</p>
                  </div>
                </div>
                
                {/* 説明 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    概要
                  </h3>
                  <p className="font-klee text-gray-700 leading-relaxed">
                    {selectedRuin.description}
                  </p>
                </div>
                
                {/* 特徴 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    主な特徴
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRuin.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span className="font-klee text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 材質 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    使用材料
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRuin.materials.map((material, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm font-klee"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* 未解明の謎 */}
                <div className="mb-8">
                  <h3 className="font-klee text-xl font-bold mb-3 text-red-700">
                    未解明の謎
                  </h3>
                  <ul className="space-y-2">
                    {selectedRuin.mysteries.map((mystery, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">?</span>
                        <span className="font-klee text-gray-700">{mystery}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* フッター */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className={`px-3 py-1 rounded-full text-sm font-klee ${
                    selectedRuin.status === 'excavated' ? 'bg-green-100 text-green-700' :
                    selectedRuin.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                    selectedRuin.status === 'surveyed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedRuin.status === 'excavated' && '発掘完了'}
                    {selectedRuin.status === 'partial' && '部分発掘'}
                    {selectedRuin.status === 'surveyed' && '調査済み'}
                    {selectedRuin.status === 'protected' && '保護区域'}
                  </span>
                  
                  <button
                    className="font-klee px-6 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                    onClick={() => setSelectedRuin(null)}
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
