module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DB_URL: process.env.DATABASE_URL || 'postgresql://vonderlasa_admin@localhost/vonderlasa-chess',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
};