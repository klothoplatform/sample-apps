import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ 'id': 1, 'firstName': 'John', 'lastName': 'Doe' })
      .expect(201)
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ 'id': 1, 'firstName': 'John', 'lastName': 'Doe' })
      .expect(201).then(
      () => {
        request(app.getHttpServer())
          .get('/users/1')
          .expect(200)
          .expect({ 'id': 1, 'firstName': 'John', 'lastName': 'Doe' })
      }
    )
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ 'id': 1, 'firstName': 'John', 'lastName': 'Doe' })
      .expect(201).then(() =>{
        request(app.getHttpServer())
          .post('/users')
          .send({ 'id': 2, 'firstName': 'Jane', 'lastName': 'Roe' })
          .expect(201)
      }).then(() => {
        request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect([
            { 'id': 1, 'firstName': 'John', 'lastName': 'Doe' },
            { 'id': 2, 'firstName': 'Jane', 'lastName': 'Roe' },
          ])
      })
  });
});
