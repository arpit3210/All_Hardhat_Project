import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";
import { oktoken, okvendor } from "../contracts";
//import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);
export default function Home() {
  const [tokensPerCurrency, setTokensPerCurrency] = useState(0);
  const [tokens, setTokens] = useState(0);
  const address = useAddress();
  const connectUsingMetamask = useMetamask();
  const account = web3.defaultAccount;
  const purchase = async () => {
    const contract = new web3.eth.Contract(
      okvendor.abi,
      okvendor.contractAddress
    );
    const ethToSend = tokens / tokensPerCurrency;
    const purchase = await contract.methods.buyTokens().send({
      from: address,
      value: web3.utils.toWei(ethToSend.toString(), "ether"),
    });
    console.log(purchase);
    await fetchPrice();
  };
  const sell = async () => {
    const vendorContract = new web3.eth.Contract(
      okvendor.abi,
      okvendor.contractAddress
    );
    const tokenContract = new web3.eth.Contract(
      oktoken.abi,
      oktoken.contractAddress
    );
    const approve = await tokenContract.methods
      .approve(
        okvendor.contractAddress,
        web3.utils.toWei(tokens.toString(), "ether")
      )
      .send({
        from: address,
      });
    const sellTokens = await vendorContract.methods.sellTokens(tokens).send({
      from: address,
    });
    await fetchPrice();
  };
  const fetchPrice = async () => {
    const contract = new web3.eth.Contract(
      okvendor.abi,
      okvendor.contractAddress
    );
    const priceFromContract = await contract.methods
      .getNumberOfTokensInNativeCurrency()
      .call();
    setTokensPerCurrency(priceFromContract);
  };
  useEffect(() => {
    fetchPrice();
  }, []);
  return (
    <div>
      <Head>
        <title>Exchange OKTokens</title>
      </Head>
      {address ? (
        <div>
          <p>Tokens per currency: {tokensPerCurrency}</p>
          <div>
            <input
              type="number"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
            />
          </div>
          <button onClick={purchase}>Purchase</button>
          <button onClick={sell}>Sell</button>
        </div>
      ) : (
        <div>
          <button onClick={connectUsingMetamask}>Connect using MetaMask</button>
        </div>
      )}
    </div>
  );
}