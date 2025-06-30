'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import TableOfContents from '@/components/TableOfContents'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3])

  return (
    <main className="relative">
      {/* 新しいヒーローセクション */}
      <HeroSection />
      
      {/* 目次セクション */}
      <TableOfContents />

      {/* 各章のプレースホルダー */}
      {[1, 2, 3].map((chapter) => (
        <motion.section
          key={chapter}
          id={`chapter-${chapter}`}
          className="min-h-screen px-8 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="content-section p-8 max-w-4xl mx-auto">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-klee text-3xl md:text-4xl font-bold mb-8"
              style={{ color: '#2C2C2C' }}
            >
              {
                chapter === 1 ? 'ここには何が眠っているのか' :
                chapter === 2 ? '昆虫の100の新種があるということは〜菌類の想定新種数〜' :
                'なぜ80もの古代遺跡が存在する謎'
              }
            </motion.h2>
            
            <div className="prose prose-lg max-w-none">
              {Array.from({ length: 5 }, (_, i) => (
                <motion.p
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="font-klee leading-relaxed mb-6"
                  style={{ color: '#2C2C2C' }}
                >
                  {
                    chapter === 1 ? '255ヘクタールの広大な土地には、まだ誰も知らない秘密が眠っています。古代の痕跡、未知の生態系、そして謎に包まれた遠い記憶。この章では、この土地が秘めるものを探ります。' :
                    chapter === 2 ? '昆虫だけで100種もの新種が発見されたことは、この土地の生態系がいかに豊かであるかを示しています。では、菌類はどうでしょうか？推定される新種数は驚くべきものです。' :
                    '80もの古代遺跡がこの地に集中していることは、単なる偶然ではありません。誰が、いつ、何のためにこれらを建造したのか。その謎に迫ります。'
                  }
                  研究ノートには、詳細な観察記録と分析結果が記されています。
                </motion.p>
              ))}
            </div>
            
            {/* 詳細ページへのリンク */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Link
                href={`/chapter${chapter}`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200 hover:border-amber-300"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {chapter === 1 ? '📚' : chapter === 2 ? '🔬' : '🗿'}
                </span>
                <span className="font-klee text-lg font-semibold" style={{ color: '#2C2C2C' }}>{
                  chapter === 1 ? '探検記録アーカイブを見る' :
                  chapter === 2 ? '標本コレクションを見る' :
                  '遺跡カタログを見る'
                }</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* スクロールを促すための追加コンテンツ */}
      <section className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="content-section p-12 text-center"
        >
          <h3 className="font-klee text-2xl mb-4" style={{ color: '#2C2C2C' }}>
            研究は続く...
          </h3>
          <p className="font-klee" style={{ color: '#6B6B6B' }}>
            新たな発見をお楽しみに
          </p>
        </motion.div>
      </section>
    </main>
  )
}
