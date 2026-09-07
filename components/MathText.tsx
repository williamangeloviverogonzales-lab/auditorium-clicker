'use client'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export function MathInline({ math }: { math: string }) {
  const html = katex.renderToString(math, { throwOnError: false })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}