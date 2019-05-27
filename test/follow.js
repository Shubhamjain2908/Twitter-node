require('./init');

const User = require('./../models/User');
const Token = require('./../models/Token');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../app');
let should = chai.should();

chai.use(chaiHttp);

const user1 = {
    username: 'testuser',
    password: '123456'
};
const user2 = {
    username: 'testuser2',
    password: '123456'
};
let token = '';
let userId1;
let userId2;

describe('Follow', () => {

    before((done) => {
        User.query().skipUndefined().select('id').where('username', user1.username).first().then(result => {
            userId1 = result.id;
            Token.query().skipUndefined().select('token').where('userId', userId1).first().then(r => {
                token = 'Bearer ' + r.token;
                User.query().skipUndefined().select('id').where('username', user2.username).first().then(result2 => {
                    if (result2) {
                        userId2 = result2.id;
                        done();
                    } else {
                        User.query().insert(user2).returning('*').then(result3 => {
                            userId2 = result3.id;
                            done();
                        });
                    }
                });
            });
        });
    });

    describe('/POST follow', () => {

        it('should return no user found error', (done) => {
            chai.request(app)
                .post('/api/follow')
                .send({
                    id: '00'
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('No user found to follow with this user Id');
                    done();
                });
        });

        it('should follow User2', (done) => {
            chai.request(app)
                .post('/api/follow/')
                .send({
                    id: userId2
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.should.have.property('message').eql('Successfully following the user');
                    done();
                });
        });

        it('should throw cannot follow yourself error', (done) => {
            chai.request(app)
                .post('/api/follow')
                .send({
                    id: userId1
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('You cannot follow yourself!');
                    done();
                });
        });

    });

    describe('/POST unfollow', () => {

        it('should return no user found error', (done) => {
            chai.request(app)
                .post('/api/unfollow')
                .send({
                    id: '00'
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('No user found with this user Id');
                    done();
                });
        });

        it('should unfollow User2', (done) => {
            chai.request(app)
                .post('/api/unfollow/')
                .send({
                    id: userId2
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('Unfollowed successfully');
                    done();
                });
        });

        it('should throw you were not following this user error', (done) => {
            chai.request(app)
                .post('/api/unfollow')
                .send({
                    id: userId2
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.have.property('message').eql('You were not following this user');
                    done();
                });
        });

    });

});