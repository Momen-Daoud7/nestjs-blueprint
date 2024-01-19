import { rm } from 'fs/promises';
import { join } from 'path';
import { createConnection, getConnection } from 'typeorm';

global.beforeEach(async () => {
  createConnection()
    .then(async (connection) => {
      await connection.dropDatabase();
      await connection.close();
    })
    .catch((error) => console.log(error));
})

global.afterEach(async () => {
  const conn = getConnection();
  console.log(
    `=====================================================================`,
  );
  console.log(conn);
  console.log(
    `=====================================================================`,
  );
  await conn.close();
});
