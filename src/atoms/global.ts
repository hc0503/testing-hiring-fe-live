import { atom } from "jotai"

type Global = {
  latestBlock?: number
}

const init: Global = {
  latestBlock: undefined 
}

export const globalAtom = atom<Global>(init)

