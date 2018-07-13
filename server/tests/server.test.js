const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Tutor} = require('./../models/tutors');
const {tutors, populateTutor} = require('./seed/seed');

beforeEach(populateTutor);

describe('GET /tutors', () => {
    it('should get all tutors', (done) => {
        request(app)
            .get('/tutors')
            .expect(200)
            .expect((res) => {
                expect(res.body.tutors.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /tutors/:id', () => {
    it('should get a tutor given an id', (done) => {
        request(app)
            .get(`/tutors/${tutors[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.tutor.name).toBe(tutors[0].name);
            })
            .end(done);
    });

    it('should send 404 status if no tutor found', (done) => {
        request(app)
            .get(`/tutors/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    })
})