import { flushSync } from 'react-dom'

export function viewTransition(callback: () => void) {
  // @ts-expect-error
  if (document.startViewTransition) {
    // @ts-expect-error
    document.startViewTransition(() => {
      flushSync(() => {
        callback()
      })
    })
  } else {
    callback()
  }
}
