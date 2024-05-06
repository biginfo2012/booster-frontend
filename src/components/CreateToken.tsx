import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountInstruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { ChangeEvent, FC, useCallback, useState } from "react";
import Link from "next/link";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { create } from 'ipfs-http-client';
// import axios from 'axios-typescript';
import axios from 'axios';
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import dotenv from 'dotenv';

import { CoinDetail } from '../utils/types';

export const CreateToken: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("9");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenDescription, setTokenDescription] = useState<string>("");
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [twitterURL, setTwitterURL] = useState<string>("");
  const [telegramURL, setTelegramURL] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  dotenv.config()

  const host = process.env.SERVER_HOST; 
  const port = process.env.SERVER_PORT;
  const baseUrl = 'https://'+host+':'+port;
  const projectId = process.env.IPFS_PROJECT_ID;
  const projectSecret = process.env.IPFS_PROJECT_SECRET;
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  });

  // Function to handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setTokenUri("");
    }
  };

  const uploadImageToIPFS = async (image: File): Promise<string> => {
    const { cid } = await ipfs.add(image);
    return cid.toString();
  }

  const handleCreatingToken = async () => {
    if (file) {
      const cid = await uploadImageToIPFS(file);
      if (cid) setTokenUri(cid);
    }

    createToken();
  }

  const createToken = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      return;
    }

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();

    setIsLoading(true);
    try {
      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),

        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(tokenDecimals),
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID,
        ),

        createCreateMetadataAccountInstruction(
          {
            metadata: (
              await PublicKey.findProgramAddress(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer(),
                ],
                PROGRAM_ID,
              )
            )[0],
            mint: mintKeypair.publicKey,
            mintAuthority: publicKey,
            payer: publicKey,
            updateAuthority: publicKey,
          },
          {
            createMetadataAccountArgs: {
              data: {
                name: tokenName,
                symbol: tokenSymbol,
                uri: tokenUri,
                creators: null,
                sellerFeeBasisPoints: 0,
              },
              isMutable: false,
            },
          },
        ),
      );
      const signature = await sendTransaction(tx, connection, {
        signers: [mintKeypair],
      });
      setTokenMintAddress(mintKeypair.publicKey.toString());
      notify({
        type: "success",
        message: "Token creation successful",
        txid: signature,
      });
    } catch (error: any) {
      setTokenMintAddress("");
      notify({ type: "error", message: "Token creation failed" });
    }

    if (tokenMintAddress) {
      await axios.post(baseUrl+'/api/coin', {
        // Pass the coin data as the request body
        name: tokenName,
        symbol: tokenSymbol,
        image: tokenUri,
        address: tokenMintAddress,
        creator: publicKey,
        description: tokenDescription,
        website: websiteURL,
        twitter: twitterURL,
        telegram: telegramURL,
        decimals: 9
      })
      .then(response => {
        // Handle the success response
        notify({ type: "success", message: "Token creation Success" });
        console.log(response.status); // Prints 201
        console.log(response.data); // Prints the created coin object, with the coin type
      })
      .catch(error => {
        // Handle the error response
        notify({ type: "error", message: "Server communication failed." });
        console.error(error);
      });

      await axios.post<CoinDetail>(baseUrl+'/coin', {
        // Pass the coin data as the request body
        name: tokenName,
        symbol: tokenSymbol,
        image: tokenUri,
        address: tokenMintAddress,
        creator: publicKey,
        description: tokenDescription,
        website: websiteURL,
        twitter: twitterURL,
        telegram: telegramURL,
        decimals: 9
      })
      .then(response => {
        // Handle the success response
        notify({ type: "success", message: "Token creation Success" });
        console.log(response.status); // Prints 201
        console.log(response.data); // Prints the created coin object, with the coin type
      })
      .catch(error => {
        // Handle the error response
        notify({ type: "error", message: "Server communication failed." });
        console.error(error);
      });
    }
    
    setIsLoading(false);
  }, [
    publicKey,
    connection,
    tokenDecimals,
    tokenName,
    tokenSymbol,
    tokenUri,
    sendTransaction,
  ]);

  return (
    <div className="relative z-10">
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}
      {!tokenMintAddress ? (
        <div>
          <div className="relative z-10 justify-center gap-[100px] text-white lg:flex">
            <div className="w-full lg:w-1/2">
              <h2 className="pb-[28px] text-[25px]">Token information</h2>
              <form>
                <div className="flex flex-col gap-[10px] pb-[30px]">
                  <label htmlFor="tokenName">Token name (ex. Boo$ter)</label>
                  <input
                    className="common-input"
                    type="text"
                    id="tokenName"
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="Enter token name"
                    maxLength={12}
                  />
                </div>
                <div className="flex flex-col gap-[10px] pb-[30px]">
                  <label htmlFor="symbol">Symbol (Max 10, ex. BSTR)</label>
                  <input
                    className="common-input"
                    type="text"
                    id="symbol"
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="Enter token symbol"
                  />
                </div>
                <div className="flex flex-col gap-[10px] pb-[30px]">
                  <label htmlFor="description">Description (Optional)</label>
                  <input
                    className="common-input"
                    type="text"
                    id="description"
                    onChange={(e) => setTokenDescription(e.target.value)}
                    placeholder="Enter token description"
                  />
                </div>
                <div className="flex flex-col gap-[10px] pb-[30px]">
                  <label>Socials (Optional)</label>
                  <input
                    className="common-input"
                    type="text"
                    id="websiteURL"
                    value={websiteURL}
                    onChange={(e) => setWebsiteURL(e.target.value)}
                    placeholder="Website URL"
                  />
                  <input
                    className="common-input"
                    type="text"
                    id="twitterURL"
                    value={twitterURL}
                    onChange={(e) => setTwitterURL(e.target.value)}
                    placeholder="Twitter (X) URL"
                  />
                  <input
                    className="common-input"
                    type="text"
                    id="telegramURL"
                    value={telegramURL}
                    onChange={(e) => setTelegramURL(e.target.value)}
                    placeholder="Telegram URL"
                  />
                </div>
                <p className="pb-[10px]">
                  Symbol image (Square size 128x128 or large)
                </p>
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor="symbolImage"
                    className="relative h-[182px] cursor-pointer rounded-[15px] border border-dashed border-white"
                  >
                    <input
                      className="hidden"
                      type="file"
                      id="symbolImage"
                      onChange={handleFileChange}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      <CiImageOn size={70} className="m-auto" />
                      <u>Upload an Image</u>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="pb-[28px] text-[25px]">Preview</h2>
              <div className="flex items-center gap-[8px] rounded-[20px] bg-[#333333] p-[8px] md:gap-[18px] md:p-[14px]">
                <div className="flex h-[98px] w-[98px] items-center">
                  {file ? (
                    <div>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="min-w-[80px] rounded-[20px]"
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/createtoken/tokenImage.png"
                      alt="Preview"
                    />
                  )}
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <h2 className="text-[14px] text-white sm:text-[20px]">
                      {tokenName}
                      {!tokenName && (
                        <label htmlFor="tokenName">TOKEN NAME</label>
                      )}
                    </h2>
                    <Link href="#">
                      <a className="text-[10px] text-[#9945FF] 2xl:text-[12px]">
                        by <u>uKnowMe</u>
                      </a>
                    </Link>
                  </div>
                  <p className="break-words py-[14px] text-[12px]">
                    {tokenDescription}
                    {!tokenDescription && (
                      <label htmlFor="description">
                        Merged with a vision to be a fun and engaging meme
                        coin...
                      </label>
                    )}
                  </p>
                  <div className="flex gap-[10px]">
                    <Link href={twitterURL}>
                      <a>
                        {" "}
                        <FaXTwitter
                          className="border-4 border-[#272727] p-[1px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                    <Link href={websiteURL}>
                      <a>
                        {" "}
                        <FaGlobe
                          className="border-4 border-[#272727] p-[1px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                    <Link href={telegramURL}>
                      <a>
                        <FaTelegramPlane
                          className="border-4 border-[#272727] p-[1px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="pt-[41px] pb-[28px] text-[25px]">
                  Token information
                </h2>
                <div className="flex pb-[20px] text-[14px] md:text-[20px]">
                  <p className="w-[150px]">Token name</p>
                  {tokenName}
                </div>
                <div className="break-words pb-[20px] text-[14px] md:flex md:text-[20px]">
                  <p className="w-[150px]">Symbol</p>
                  {tokenSymbol}
                </div>
                <div className="break-words pb-[20px] text-[14px] md:flex md:text-[20px]">
                  <p className="w-[150px]">Description</p> {tokenDescription}
                </div>
                <div className="flex gap-[120px] text-[14px] md:gap-[164px] md:text-[20px]">
                  <p>Socials</p>
                  <div className="flex gap-[10px]">
                    <Link href={twitterURL}>
                      <a>
                        <FaXTwitter
                          className="bg-[#333333] p-[2px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                    <Link href={websiteURL}>
                      <a>
                        <FaGlobe
                          className="bg-[#333333] p-[2px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                    <Link href={telegramURL}>
                      <a>
                        <FaTelegramPlane
                          className="bg-[#333333] p-[2px] text-[#8D93B7]"
                          size={24}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center pt-[48px] text-white">
            <button onClick={handleCreatingToken} className="flex justify-center rounded-[15px] bg-[#9945FF] py-1 px-7 text-[20px] text-white">
              Create token
            </button>
            <p className="pt-[15px] text-[14px]">Cost to deploy: 0.025 SOL</p>
          </div>
          {/* <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Token URI</div>
            </div>
            <div className="m-auto p-2">
              <input
                className="common-input rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                onChange={(e) => setTokenUri(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Token decimals</div>
              <p>Default value is 9 for solana.</p>
            </div>
            <div className="m-auto p-2">
              <input
                className="common-input rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                type={"number"}
                min={0}
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(e.target.value)}
              />
            </div>
          </div> */}
        </div>
      ) : (
        <div className="mt-4 break-words">
          <p className="font-medium">Link to your new token.</p>
          <a
            className="cursor-pointer font-medium text-purple-500 hover:text-indigo-500"
            href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
            target="_blank"
            rel="noreferrer"
          >
            {tokenMintAddress}
          </a>
        </div>
      )}
    </div>
  );
};
