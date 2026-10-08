/** @type {import('next').NextConfig} */
/*const nextConfig = {
  allowedDevOrigins: ["http://192.168.8.180:3000","http://192.168.8.130:3000"]
  /* config options here 
};*/
const nextConfig = {
  allowedDevOrigins: [
    "192.168.8.180",
    "192.168.8.142",
    "192.168.8.130",
  ],
    images: {
    qualities: [72, 75],
    remotePatterns: [
      {
        protocol:
          "https",

        hostname:
          "firebasestorage.googleapis.com",
      },
    ],
  },
};
export default nextConfig;
