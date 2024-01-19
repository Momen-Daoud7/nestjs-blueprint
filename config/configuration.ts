export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  type: `postgres`,
  host: `${process.env.DATABASE_HOST}` || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: `${process.env.DATABASE_USERNAME}` || 'postgres',
  password: `${process.env.DATABASE_PASSWORD}` || '',
  database: `${process.env.DATABASE_NAME}` || 'blueprint',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});