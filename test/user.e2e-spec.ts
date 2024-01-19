import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('User managment', () => {
    it('Should retrive all users', async () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .then((res) => {
          expect(res).toHaveLength;
        });
    });

    it('Should create a new user', async () => {
      const email = 'momen@gmail.com';
      return request(app.getHttpServer())
        .post('/users')
        .send({ email, password: '1212334' })
        .expect(201)
        .then((res) => {
          expect(res.body.email).toBe(email);
        });
    });

    it('Should get a single user by his id', async () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .then((res) => {
          expect(res.body.email).toBeDefined();
          expect(res.body.id).toBeDefined();
        });
    });

    it('Should return not found when user id not exist', async () => {
      return request(app.getHttpServer()).get('/users/1000').expect(404);
    });

    it('Should find user by email', async () => {
    const email = 'momen@gmail.com';
      return request(app.getHttpServer())
        .post('/users/email')
        .send({email})
        .expect(201)
        .then((res) => {
          expect(res.body.email).toBe(email);
          expect(res.body.id).toBeDefined();
        });
    });

    it('Should return not found when user id not exist on finding by email', async () => {
      return request(app.getHttpServer()).post('/users/email').send({email: "new@new.com"}).expect(404);
    });

    it('Should update user data', async () => {
      const email = 'momen1@gmail.com';
      return request(app.getHttpServer())
        .patch('/users/1')
        .send({ email })
        .expect(200)
        .then((res) => {
          expect(res.body.email).toBe(email);
        });
    });

    it('Should return not found when user id not exist on update', async () => {
      return request(app.getHttpServer())
        .patch('/users/10000')
        .send({ email: 'Any@Any.com' })
        .expect(404);
    });

    it('Should delete user data', async () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .expect(200)
    });

    it('Should return not found when user id not exist on delete', async () => {
      return request(app.getHttpServer()).delete('/users/1000').expect(404);
    });
  });
});
