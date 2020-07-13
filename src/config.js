module.exports = {
    ADDRESS: "http://localhost",
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '7b967bbe-afc2-11ea-b3de-0242ac130004',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/logixion',
}