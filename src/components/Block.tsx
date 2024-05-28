import React, { useMemo } from "react"
import RPCCalls from "../utils/API";
import { Text } from "@chakra-ui/react"
import { useAtom } from "jotai";
import { globalAtom } from "../atoms/global";

const Block: React.FC = () => {
  const [globalState, setGlobalState] = useAtom(globalAtom);
  const { isLoading, data } = RPCCalls.getBlock()
  
  const blockNumber = useMemo(() => {
    if(data) {
      const block = parseInt(data?.result?.toString())
      if(Number.isNaN(block)) return

      setGlobalState({
        ...globalState,
        latestBlock: block
      })
      return block 
    }
  }, [data])

  return (
    <>
      { !isLoading ? 
        <Text>Latest Block is {blockNumber}</Text> : 
        <Text> Loading... </Text>
      }
    </>
  )
}

export default Block
