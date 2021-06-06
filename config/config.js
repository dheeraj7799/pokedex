module.exports = {
    port: process.env.PORT || 3000,
    caching: true,
    versions: {
        'Version 1': '/v1',
    },
    pokedex_options: {
        protocol: 'https',
        hostName: process.env.pokedex,
        versionPath: process.env.version_path,
        cacheLimit: 1000 * 200, // * 200s
        timeout: 5 * 1000, // * 5s
    },
    redis: {
        host: process.env.REDIS_HOST,
    },
};