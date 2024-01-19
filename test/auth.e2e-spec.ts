import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from '../src/auth/auth.module';


describe('Authentication System', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should register a new user', async () => {
    const email = 'new@mail.com';
    const password = 'asdlkq4321';

    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(500)
      .then(res => console.log(res))
  });

  it('register as a new user then get the currently logged in user', async () => {
    const email = 'new@new.com';
    
     const { body } = await request(app.getHttpServer())
       .post('/auth/register')
       .send({ email, password: 'asdf' })
       .expect(201);
      

    await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${body.token}`)
      .expect(200)
      .then((res) => {
        const { email, id } = res.body;
        expect(email).toEqual(email);
        expect(id).toBeDefined();
      });
  });

});
