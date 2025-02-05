import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'safariavventura.com',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
