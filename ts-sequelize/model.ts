/**
 * @klotho::execution_unit {
 *  name = "sequelize-main"
 * }
 */
const { Sequelize, DataTypes } = require('sequelize');


// @klotho::persist
const sequelize = new Sequelize('sqlite::memory:', {logging: false});

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
  
  (async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();


  export async function set(key:string, value:any){
        const item = await KV.upsert({key:key, value:value})
  }

  export async function get(key:string): Promise<any>{

    const items = await KV.findAll({
        where:{
            key: key
        }
    })

    if (items.length == 1){
        return items[0].value
    }

    return undefined
  }