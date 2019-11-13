/*We are creating the routes now. app is an object. it now has function. we are looking at "get function". e.g route of files etc. in below: / is the path of file then the function is (callback function) asking  what you want me to day. 
first argument: route addres
second argument: callback
*/
app.get('/', (req, res) => { //req is request. contains all info about client
    res.send("<h1>Weclome Home</h1>") // res is response and coming from express
  })
   
  app.get('/about', (req, res) => {
      res.send("<h1>About Page</h1>"
      )
  })
  
  app.get('/contact', (req, res) => { //req is request and res is response
      res.send("<h1>Contact us @ +971-800800</h1>")
  })
  
  //dynamic page address now by adding colon : after forward slash
  app.get('/blog/:page', (req, res) => { 
      const page = req.params.page; //to access the page`
      res.send("<h1>Welcome to " + page + "</h1>")
  })
  
  //backtick allows us to put.... /get-users?filter=2016&max=10 i.e. give me users from 2016 and maximum of 10. this is useful in API
  app.get('/about', (req, res)=>{
  
      //we are using backtick in below. There are two ways to show data in JS. if uou want a string and plus sign to glue them together. single qyote and diube qyotes are same.  a third way is a backtick `. the advantage is backtic is you can take the variable and remove the plus sign and add variable insie quote. seod we have to communicate to js that this string is actually a varaible by wrapping around cryly braces and prefix it with a dollar sign
      res.send(` 
                  <h1>About Page</h1>
                  <p>${req.query.section}</p>
                  <p>${req.query.year}</p>
                  <p>${req.query.industry}</p>
      `)
  
  });
  
  app.get('*', (req, res) => {
      res.send("<h1>404 Error Page</h1>"
      )
  })
  