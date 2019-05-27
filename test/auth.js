require('./init');

const User = require('./../models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../app');
let should = chai.should();


chai.use(chaiHttp);

const user = {
    username: 'testuser',
    password: '123456'
};

describe('User', () => {
    before((done) => {
        User.query().where('username', 'testuser').delete().then(result => {
            done();
        });
    });

    describe('/POST login user', () => {

        it('it should throw no user found error', (done) => {
            chai.request(app)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Username is not registered.');
                    done();
                })
        })

    });

    describe('/POST user', () => {

        it('it should create a user', (done) => {
            chai.request(app)
                .post('/api/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('username').eql('testuser');
                    res.body.should.have.property('message').eql('Your account has been created successfully');
                    res.header.should.have.property('authtoken');
                    done();
                })
        });
        it('it should throw user already exists error', (done) => {
            chai.request(app)
                .post('/api/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Account with this username already exists!')
                    done();
                })
        });

    });

    describe('/POST login user', () => {

        it('it should log in user', (done) => {
            chai.request(app)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('username').eql('testuser');
                    res.body.should.have.property('message').eql('Login Successfully');
                    res.header.should.have.property('authtoken');
                    done();

                })
        });
        it('it should throw incorrect password error', (done) => {
            const newUser = {
                ...user,
                password: '12345'
            };
            chai.request(app)
                .post('/api/login')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Please enter valid credentials.')
                    done();
                })
        });
    });
});