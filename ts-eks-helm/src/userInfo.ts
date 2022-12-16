/**
 * @klotho::execution_unit {
 *  id = "user-info"
 * }
 */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import {getUsers} from './users'

const sequelize = setupSequelize();

async function setupSequelize(): Promise<Sequelize> {

  /** 
   * @klotho::persist  {
   *   id = "sequelizeDB"
   * }
   * */ 
  const sequelize = new Sequelize(`sqlite::memory:`, { logging: false });

  console.log("connecting");
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("connected");
  return sequelize;
}

interface attribs
  extends Model<InferAttributes<attribs>, InferCreationAttributes<attribs>> {
    user: string,
    age: string;
    org: string;
}

const KV = sequelize.then(async (client) => {
  const KV = client.define<Model<InferAttributes<attribs>>>(
    "KV",
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      org: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  await KV.sync({ alter: true });
  return KV;
});

export async function set(user: string, age: string, org: any) {
    const client = await KV;
    console.log("got client")
    const users = await getUsers()
    if (users.includes(user)) {
      const item = await client.upsert({ user: user, age: age, org: org });
    } else {
      throw new Error('user does not exist')
    }
}

export async function getOrg(user: string): Promise<any> {
    const client = await KV;
    console.log("got client")
    const items = await client.findAll({
      where: {
        user: user,
      },
    });
    if (items.length == 1) {
      return items[0].get().org;
    }
  return undefined;
}
