/**
 * @klotho::execution_unit {
 *  name = "sequelize-main"
 * }
 */
const { Sequelize, DataTypes } = require('sequelize');


// @klotho::persist
const sequelize = new Sequelize(`sqlite::memory:`, {logging: false});

const KV = sequelize.define('KV', {
   
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
   
});
  
const connect = (async () => {
  console.log("starting up db connection!")
  try {
    await sequelize.authenticate().then;
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully and synced.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
  // Code here
})();


  export async function set(key:string, value:any){
    try{
      await connect
      const item = await KV.upsert({key:key, value:value})
    } catch (error) {
      console.error(`unable to set key:${key}, value:${value}. Received error:${error}`)
    }
  }

  export async function get(key:string): Promise<any>{
    try{
      await connect
      const items = await KV.findAll({
          where:{
              key: key
          }
      })

      if (items.length == 1){
          return items[0].value
      }
    } catch (error) {
      console.error(`unable to get key:${key}. Received error:${error}`)
    }

    return undefined
  }