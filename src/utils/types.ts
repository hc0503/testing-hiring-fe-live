export type BlockWithTxns = {
	"status": string,
	"block_hash": string,
	"parent_hash": string,
	"block_number": number,
	"new_root": string,
	"timestamp": number,
	"sequencer_address": string,
	"l1_gas_price": {
		"price_in_fri": string,
		"price_in_wei":string 
	},
	"starknet_version": string,
	"transactions": string[]  
}
