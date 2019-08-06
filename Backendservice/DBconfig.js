const mongoDbclient=require("mongodb").MongoClient
const url="mongodb://kiranveera:kiranveera@cluster0-shard-00-00-pni2t.mongodb.net:27017,cluster0-shard-00-01-pni2t.mongodb.net:27017,cluster0-shard-00-02-pni2t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
var dbo
function initDb() {
    mongoDbclient.connect(url,{ useNewUrlParser:true },(err,client)=>
    {
        if(err)
        {
            console.log("error in connection in database")
            console.log(err)
        }
        else
        {
           
            dbo=client.db("sampledatabase")
            console.log("database is connected")
        }
    });
}
function getDb()
{
    
    return dbo;
}

module.exports={
                    getDb,
                    initDb
                }