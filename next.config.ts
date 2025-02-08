import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
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
