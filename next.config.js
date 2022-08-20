/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
}

module.exports = nextConfig
module.exports = {
   redirects:async () =>{
    return [
      {
        source: '/product1',
        destination: '/404',
        permanent: true,
      },
    ];
  },
  images:{
    domains: ["i.im.ge"]
  }
}
