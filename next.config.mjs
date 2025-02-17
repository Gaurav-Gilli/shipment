/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/admin',  // Redirect root (/) to /admin
          permanent: true,        // Permanent redirect (301)
        },
      ];
    },
  };
  
  export default nextConfig;
  
