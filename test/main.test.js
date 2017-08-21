var request = require('supertest'), app = require('../server.js')

descirbe("homepage", function() {
  it("Form is shown when / is requested to my server", function(done){
    request(app).get("/")
    .expect(200)
  })
})

descirbe("post form", function() {
  it("Posting data from the form to the data set", function(done){
    request(app).post("/post")
    .send({"people":[{"firstname":["tommy","Chris","Alex","tommy","Natalie"],"surname":["tommy","Kamara","Hammond","White","Sawyer"]}]})
    .expect(200)
  })
})

descirbe("get all data route call", function() {
  it("Show that the correct data is shown when route is sent", function(done){
    request(app).get("/getData")
    .expect({"people":[{"firstname":["tommy","Chris","Alex","tommy","Natalie"],"surname":["tommy","Kamara","Hammond","White","Sawyer"]}]})
    .expect(200)
  })
})

descirbe("get all data route call", function() {
  it("Show that the correct data is shown when route is sent", function(done){
    request(app).get("/notARealURL")
    .expect(404)
  })
})
