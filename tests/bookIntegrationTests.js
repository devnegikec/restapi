var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Book = require('../models/bookModel'),
    agent = request.agent(app);

describe('Book Crud Test', function(){
  it('Should allow a book to be postd and return a read and _id', function(done){
      var bookPost = {title:'new Book', author:'Jon', genre: 'Fiction'};
      agent.post('/api/books')
           .send(bookPost)
           .expect(200)
           .end(function(err, results){
             results.body.read.should.equal(false);
             results.body.should.have.property('_id');
             done();
           })
  })
  afterEach(function(done){
    Book.remove().exec();
    done();
  })
})
