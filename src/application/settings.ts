export  const settings = {
    JWT_SECRET :process.env.JWT_SECRET || "123",
    ACCESS_TOKEN_EXPIRY: '20s',
    REFRESH_TOKEN_EXPIRY: '10s'
}