import useSWR from 'swr'
import { BlockWithTxns } from './types'

const endpoint = import.meta.env.VITE_APP_RPC_ENDPOINT ?? "https://free-rpc.nethermind.io/mainnet-juno/" 

const jsonPayload = {
    "jsonrpc": "2.0",
    "method": "starknet_specVersion",
    "params": {},
    "id": 1
}

type Result<T> = {
  "jsonrpc": "2.0",
  "result": T,
  "id": 1
}

const createPayload = (method: string, params: any) => {
	return {
		...jsonPayload,
		"method": method,
		"params": params
	}
}

const fetcher = async ({ body }: {body: Record<string, unknown>}): Promise<any> => {
	const res = await fetch(`${endpoint}`, {
		method: "POST",
		body: JSON.stringify(body) 
	})
	const response = await res.json()
	if(res.status >= 400 && res.status < 500) {
		throw new Error(response?.message ?? "Failed to fetch")
	}
	return response 
}

export default class RPCCalls {
	static getBlock = () => {
		return useSWR<Result<number>>(
			'/', 
			() => fetcher({
				body: createPayload('starknet_blockNumber', {})
			}),
		)
	}
	static getBlockWithTxns = (blockNumber: number | "latest") => {
		return useSWR<Result<BlockWithTxns>>(
			`/${blockNumber}`, 
			() => fetcher({
				body: createPayload('starknet_getBlockWithTxHashes', {
					block_id: blockNumber === "latest" ? "latest" : {
						block_number: blockNumber
					}
				})
			}),
			{
				errorRetryCount: 3
			}
		)
	}
}
