'use client'

import { useEffect } from 'react'

interface ToolTipProps {
  name: string
  codeIndex: string
  content: Record<string, string>
}

export function ToolTip({ name, codeIndex, content }: ToolTipProps) {
  useEffect(() => {
    const nav = document.querySelector(`nav[data-for=${name}]`)
    if (!nav) return

    let pre = nav
    for (let i = 0; i < +codeIndex + 1; ++i) {
      pre = pre.nextElementSibling as HTMLPreElement
    }

    const code = pre.firstElementChild
    if (!code) return

    for (const key in content) {
      // 하이라이트된 라인
      const span = code.childNodes[+key - 1] as HTMLElement
      if (!span) return

      span.setAttribute('content', `→ ${content[key]}`)
    }
  }, [name, content, codeIndex])
}
