import { initializeSslPinning } from "react-native-ssl-public-key-pinning";

const pins = [
  {domain: "ub.edu.sa", hash: "w14FsSqwEbNJ9GH27V8AYpzm5qAIVzkR2sNKvBTk1gg="},
];

const pinsObject = {};

pins.forEach((pin) => {
  pinsObject[pin.domain] = {
    includeSubdomains: true,
    publicKeyHashes: [
      pin.hash,
      "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    ],
  };
});

export const pinning = async () => {
  try {
    await initializeSslPinning(pinsObject);
    console.log("pinning done");
  } catch (error) {
    console.log("pinning erroorr",error);
  }
};