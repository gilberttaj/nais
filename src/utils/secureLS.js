import SecureLS from "secure-ls";


// Create the configuration object
const config = {
  encodingType: "aes",
  isCompression: true,
  encryptionSecret: import.meta.env.VITE_SECURE_LS_KEY,
};

// Initialize SecureLS with the configuration
const ls = new SecureLS(config);

export default ls;