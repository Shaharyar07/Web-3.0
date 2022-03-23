import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const checkIfTransactionExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new error("No ethers object found");
    }
  };
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {}
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      const transactionContract = getEthereumContract();
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setLoading(true);
      console.log(`Loading... ${transactionHash.hash}`);
      await transactionHash.wait();
      setLoading(false);
      console.log(`Success... ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new error("No ethers object found");
    }
  };
  const checkIfAccountIsConnected = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      }
    } catch (error) {
      console.log(error);
      throw new error("No ethers wallet found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new error("No ethers wallet found");
    }
  };
  useEffect(() => {
    checkIfAccountIsConnected();
    checkIfTransactionExists();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        loading,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
