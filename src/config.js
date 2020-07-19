module.exports = {
    ADDRESS: "https://logixon.herokuapp.com/api/",
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '7b967bbe-afc2-11ea-b3de-0242ac130004',
    //DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/logixion',
    //DATABASE_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/logixion',
    DATABASE_URL: process.env.DB_URL || 'postgres://ftglhjsxmnzoox:a63c871ad4e2650b3de5ba5465847a1cc780dcb2e2fc8dd2db686999055d4bce@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d5iaacb6ts91n8',

}