module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        port: process.env.MYSQL_PORT || '3306',
        user: process.env.MYSQL_USER || 'sql10358272',
        password: process.env.MYSQL_PASS || 'iXKHcZqyUE',
        database: process.env.MYSQL_DB || 'sql10358272',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_HOST || 'localhost',
        port: process.env.CACHE_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-19273.c90.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '19273',
        password: process.env.REDIS_PASS || 'ng4jJdL6Jq6ukroUeEXivIO9YWXxUzos'
    }
}