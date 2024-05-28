import React from "react"
import { formatUnits } from "ethers"
import RPCCalls from "../utils/API"
import { Box, Button, Collapse, HStack, Heading, Tag, Text, VStack, useDisclosure } from "@chakra-ui/react"
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import Loader from "./Loader/Loader"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import Timestamp from "./Timestamp/Timestamp"

const BlockWithTxHashes:React.FC<{
  blockId: number | "latest"
}> = ({ blockId }) => {
  const { data, isLoading, error } = RPCCalls.getBlockWithTxns(blockId)
  const { isOpen, onToggle } = useDisclosure()
  return isLoading 
    ? <Loader /> 
    : error 
      ? <Text color={"red"}>{error?.message ?? JSON.stringify(error)}</Text>
      : data
        ? <Box margin={"0.1rem 0rem"}>
          <Button onClick={onToggle} gap={"1rem"} width={"full"} justifyContent={"space-between"}>
            <Heading size={"md"} >Block: {blockId}</Heading>
            <Text>Hash: {data?.result?.block_hash}</Text>
            {isOpen ? <BiChevronUp size={"2rem"}/> : <BiChevronDown size={"2rem"} />}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <VStack gap={"0.5rem"} padding={"1rem"} alignItems={"start"} bg={"blue.100"}>
              <HStack> 
                <Tag size={"md"} key={"md"} variant='solid' colorScheme='teal'>
                  {data?.result?.status} 
                </Tag>
                <Timestamp timestamp={data?.result?.timestamp ?? 0} />
                <Box>
                  <Text color={"green"}>Price: </Text>
                  <Text>{formatUnits(data.result.l1_gas_price.price_in_wei, 18)}</Text>
                </Box>
              </HStack> 
              <Heading size={"md"}>Transactions</Heading>
              <Box padding={"1rem"} maxH={"40vh"} overflow={"auto"} borderWidth='1px' borderRadius='lg' >
                <List spacing={3}>
                  {data?.result?.transactions.map((txn) => {
                    return <ListItem>
                      <ListIcon color='green.500' />
                      {txn}
                    </ListItem>
                  })}
                </List>
              </Box>
            </VStack>
          </Collapse>
        </Box> 
        : <Text>-</Text>
}

export default BlockWithTxHashes
