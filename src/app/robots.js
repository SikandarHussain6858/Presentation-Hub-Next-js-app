export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/'],
        },
        sitemap: 'https://presentation-hub.vercel.app/sitemap.xml', // Replace with your actual domain
    };
}
