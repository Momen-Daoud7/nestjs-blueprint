export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  type: `${process.env.DATABASE_TYPE}`,
  host: `${process.env.DATABASE_HOST}` ,
  port: parseInt(process.env.DATABASE_PORT) ,
  username: `${process.env.DATABASE_USERNAME}` ,
  password: `${process.env.DATABASE_PASSWORD}` ,
  database: `${process.env.DATABASE_NAME}` ,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});