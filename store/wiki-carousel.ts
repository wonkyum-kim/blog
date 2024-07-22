import { create } from 'zustand'

interface WikiCarouselState {
  currIndex: number
  inc: () => void
  dec: () => void
}

export const useWikiCarouselStore = create<WikiCarouselState>()((set) => ({
  currIndex: 0,
  inc: () => set((state) => ({ currIndex: state.currIndex + 1 })),
  dec: () => set((state) => ({ currIndex: state.currIndex - 1 })),
}))
