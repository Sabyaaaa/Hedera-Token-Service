console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  TokenAssociateTransaction,
} = require("@hashgraph/sdk");

// Configure accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const treasuryId = AccountId.fromString(process.env.ACCOUNT_5_ID);
const treasuryKey = PrivateKey.fromString(process.env.ACCOUNT_5_PVKEY);
const aliceId = AccountId.fromString(process.env.ACCOUNT_1_ID);
const aliceKey = PrivateKey.fromString(process.env.ACCOUNT_1_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generate();

async function createFirstNft() {
    //Create the NFT
    const nftCreate = await new TokenCreateTransaction()
      .setTokenName("metaverse")
      .setTokenSymbol("mv")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(treasuryId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(250)
      .setSupplyKey(supplyKey)
      .freezeWith(client);
  
    //Sign the transaction with the treasury key
    const nftCreateTxSign = await nftCreate.sign(treasuryKey);
  
    //Submit the transaction to a Hedera network
    const nftCreateSubmit = await nftCreateTxSign.execute(client);
  
    //Get the transaction receipt
    const nftCreateRx = await nftCreateSubmit.getReceipt(client);
  
    //Get the token ID
    const tokenId = nftCreateRx.tokenId;
  
    //Log the token ID
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);
  
    
  }
  createFirstNft();
  
