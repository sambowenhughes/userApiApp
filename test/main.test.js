var request = require('supertest'), app = require('../server.js')

descirbe("homepage", function() {
  it("Form is shown when / is requested to my server", function(done){
    request(app).get("/")
    .expect(200)
  })
})

descirbe("Create user", function() {
  it("Creates a new user when the first form is sent", function(done){
    request(app).post("/createUser")
    .send({"__v":0,"created":"2017-08-21T22:07:27.958Z","email":"samjones@jones.com","surname":"jones","forename":"sam","_id":"599b599f3395a51675f89e3e"})
    .expect(200)
  })
})

descirbe("get all data route call", function() {
  it("Show that the correct data is shown when route is sent", function(done){
    request(app).get("/getUserSavedToFile")
    .expect({"__v":0,"created":"2017-08-21T22:07:27.958Z","email":"samjones@jones.com","surname":"jones","forename":"sam","_id":"599b599f3395a51675f89e3e"})
    .expect(200)
  })
})

descirbe("Incorrect route call", function() {
  it("Show a 404 if an incorrect route is called", function(done){
    request(app).get("/notARealURL")
    .expect(404)
  })
})
