require('./init');

const User = require('./../models/User');
const Token = require('./../models/Token');
const Tweet = require('./../models/Tweets');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../app');
let should = chai.should();

chai.use(chaiHttp);

const user1 = {
    username: 'testuser',
    password: '123456'
};
let token = '';
let userId1;

const testTweet = 'Postman is the only complete API development environment, and flexibly integrates with the software development cycle';
let tweetId;

describe('Tweet', () => {

    before((done) => {
        User.query().skipUndefined().select('id').where('username', user1.username).first().then(result => {
            if (result) {
                userId1 = result.id;
                Token.query().skipUndefined().select('token').where('userId', userId1).first().then(r => {
                    token = 'Bearer ' + r.token;
                    done();
                });
            } else {
                User.query().insert(user1).returning('*').then(result2 => {
                    userId1 = result2.id;
                    Token.query().skipUndefined().select('token').where('userId', userId1).first().then(r => {
                        token = 'Bearer ' + r.token;
                        done();
                    });
                });
            }
        });
    });

    it('POST /tweet should create a tweet!', (done) => {
        const data = {
            tweet: testTweet
        }
        chai.request(app)
            .post('/api/tweet')
            .send(data)
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('tweet').eql(testTweet);
                res.body.should.have.property('message').eql('Tweet created successfully!');
                tweetId = res.body.data.id;
                done();
            })
    });

    it('GET /tweet should fetch all following user tweet!', (done) => {
        chai.request(app)
            .get('/api/tweet/feed')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
            })
    });

    it('GET /tweets should fetch all tweets posted by current user!', (done) => {
        chai.request(app)
            .get('/api/tweets')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
            })
    });

    it('DELETE /tweet/:id should delete the tweet', (done) => {
        chai.request(app)
            .delete('/api/tweet/' + tweetId)
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            })
    });

});