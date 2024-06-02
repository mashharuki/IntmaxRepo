import SampleForwarderJson from "@/contracts/SampleForwarder.sol/SampleForwarder.json";
import {FORWARDER_CONTRACT_ADDRESS} from "@/utils/constants";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";
import {Contract} from "ethers";
import type {NextApiRequest, NextApiResponse} from "next";

/**
 * get Relayer method
 */
const getRelayer = async () => {
  const credentials: any = {
    apiKey: process.env.DEFENDER_API_KEY,
    apiSecret: process.env.DEFENDER_SECRET_KEY,
  };

  const ozProvider = new DefenderRelayProvider(credentials);
  const ozSigner = new DefenderRelaySigner(credentials, ozProvider, {
    speed: "fast",
  });

  return ozSigner;
};

/**
 * requestRelayer API
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    " ========================================= [RequestRaler: START] =============================================="
  );

  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }

  // recreate request data
  const request = {
    from: body.from,
    to: body.to,
    value: BigInt(body.value),
    gas: BigInt(body.gas),
    nonce: BigInt(body.nonce),
    deadline: BigInt(body.deadline),
    data: body.data,
    signature: body.signature,
  };

  console.log("request:", request);

  // get relayer
  const relayer: any = await getRelayer();
  // create forwarder contract instance
  const forwarder: any = new Contract(
    FORWARDER_CONTRACT_ADDRESS,
    SampleForwarderJson.abi,
    relayer
  ) as any;

  try {
    // call verify method
    const result = await forwarder.verify(request);
    console.log(result);
    if (!result) throw "invalid request data!";

    // call execute method from relayer
    const result2 = await forwarder.execute(request);

    console.log("tx hash:", result2.hash);

    console.log(
      " ========================================= [RequestRaler: END] =============================================="
    );
    res.setHeader("Content-Type", "text/json");
    res.status(200).json({
      result: "ok",
      txHash: result2.hash,
    });
  } catch (error) {
    console.error("Error requestRelayer :", error);
    console.log(
      " ========================================= [RequestRaler: END] =============================================="
    );
    res.setHeader("Content-Type", "text/json");
    res.status(501).json({
      result: "failed",
    });
  }
}
