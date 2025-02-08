import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
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
