
const express =require('express');
const bodyParser =require('body-parser');
const path =require("path");
const { Setting, DataBaseConfig } =require("./config/setting.config")
const swaggerUi =require('swagger-ui-express');
const YMLJS =require('yamljs');

const app = express();

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

const swaggerDocument = YMLJS.load(process.cwd()+"/swagger/swagger.yml");

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
  next();
});

var routes = require('./routes/routes.class'); 

require('./routes/routes.class')(app);

app.listen(3000,(req,res)=>{
  console.log("Server id listen On Port:3000");
})
 