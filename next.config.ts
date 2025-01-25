import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: false
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            }
        ]
    }
};

export default nextConfig;
