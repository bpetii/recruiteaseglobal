const nextConfig = {
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
    async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
                permanent: true
      },
    
    ]
  },
};

export default nextConfig