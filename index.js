const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000;
const {Snowflake} = require('@theinternetfolks/snowflake');
const connectDb = require('./dbConnection');
// const User = require('./models/User');
// const Community = require('./models/Community');
// const Role = require('./models/Role');
// const Member = require('./models/Member');

app.use(express.json());
//connect to db
connectDb();
//testing 
app.get('/',(req,res)=>{
    res.send(Snowflake.generate());
})
//importing routes
const roleRoutes = require('./routes/roleRoutes');
app.use('/v1/role', roleRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/v1/auth',userRoutes);
const communityRoutes = require('./routes/communityRoutes');
app.use('/v1/community', communityRoutes);
const memberRoutes = require('./routes/memberRoutes');
app.use('/v1/member',memberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
