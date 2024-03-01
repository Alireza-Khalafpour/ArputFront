/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
    images: {
      domains:[
        'superapp-storage.storage.iran.liara.space'
      ],
        // remotePatterns: [
        //   {
        //     protocol: "https",
        //     hostname: "**",
        //   },
        // ],
      },
}

module.exports = nextConfig
