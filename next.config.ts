/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        formats: ['image/webp', 'image/avif'],
    },
    // Enable PWA features
    ...(process.env.NODE_ENV === 'production' && {
        output: 'standalone',
    }),
}

module.exports = nextConfig