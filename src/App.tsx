import React, { useEffect, useMemo, useState } from 'react'
import { ChakraProvider, HStack, Heading, Select, Text } from '@chakra-ui/react'
import Block from './components/Block'
import theme from "./theme.ts"
import { useAtomValue } from 'jotai'
import { globalAtom } from './atoms/global.ts'
import BlockWithTxHashes from './components/BlockWithTxns.tsx'

const getLastBlocks = (current: number, size: number = 10) => {
  const blocks = []
  for (let i=current; i>current-size && current > 0; i--) {
    blocks.push(
      <BlockWithTxHashes blockId={i} />
    )
  }
  return blocks
}

const RESULT_OPTIONS = [10, 25, 50]

const App: React.FC<{children?: React.ReactNode}> = () => {

  const globalState = useAtomValue(globalAtom)

  const latestBlock = globalState?.latestBlock
  const [currentBlock, setCurrentBlock] = useState<number | undefined>()

  useEffect(() => {
    if(!currentBlock) {
      setCurrentBlock(latestBlock)
    }
  }, [latestBlock])

  const [resultSize, setResultSize] = useState(10)
  const { currentPage, lastPage } = useMemo(() => {
    return {
      currentPage: Math.floor(((latestBlock ?? 0) - (currentBlock ?? 0)) / resultSize),
      lastPage :Math.floor((latestBlock ?? 0) / resultSize)
    }
  }, [latestBlock, currentBlock, resultSize])

  const renderedBlocks = useMemo(() => {
    if(resultSize && !isNaN(resultSize) && currentBlock) {
      return getLastBlocks(currentBlock, resultSize)
    }
  }, [resultSize, currentBlock])

  return (
    <ChakraProvider theme={theme}>
      <Heading>Starknet RPC Caller</Heading>
      <Block />
      <HStack padding={"1rem"}>
        <Select 
          value={resultSize} 
          bg={"teal"}
          color={"white"}
          onChange={(e) => setResultSize(+e.target.value)}
        >
          {RESULT_OPTIONS.map(opt => <option value={opt} key={opt}>{opt}</option>)}
        </Select>
        <Text>{currentPage}/{lastPage}</Text>
      </HStack>
      {renderedBlocks}
    </ChakraProvider>
  )
}

export default App
