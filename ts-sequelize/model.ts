/**
 * @klotho::execution_unit {
 *  name = "sequelize-main"
 * }
 */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const sequelize = setupSequelize();

async function setupSequelize(): Promise<Sequelize> {
  // @klotho::persist
  const sequelize = new Sequelize(`sqlite::memory:`, { logging: false });

  console.log("connecting");
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("connected");
  return sequelize;
}

interface attribs
  extends Model<InferAttributes<attribs>, InferCreationAttributes<attribs>> {
  key: string;
  value: string;
}

const KV = sequelize.then(async (client) => {
  const KV = client.define<Model<InferAttributes<attribs>>>(
    "KV",
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {}
  );
  await KV.sync({ alter: true });
  return KV;
});

export async function set(key: string, value: any) {
  try {
    const client = await KV;
    const item = await client.upsert({ key: key, value: value });
  } catch (error) {
    console.error(
      `unable to set key:${key}, value:${value}. Received error:${error}`
    );
  }
}

export async function get(key: string): Promise<any> {
  try {
    const client = await KV;
    const items = await client.findAll({
      where: {
        key: key,
      },
    });
    if (items.length == 1) {
      return items[0].get().value;
    }
  } catch (error) {
    console.error(`unable to get key:${key}. Received error:${error}`);
  }

  return undefined;
}
