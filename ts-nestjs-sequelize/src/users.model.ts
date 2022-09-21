import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';


const sequelize = setupSequelize();

async function setupSequelize(): Promise<Sequelize> {

  /* @klotho::persist  {
   *   id = "usersDB"
   * }
   */
  const sequelize = new Sequelize('sqlite::memory:');

  console.log('connecting');
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('connected');
  return sequelize;
}

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: string;
  firstName: string;
  lastName: string;
}

const usersModel = sequelize.then(async (client) => {
  const usersModel = client.define<Model<InferAttributes<UserModel>>>(
    'Users',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // creates the 'Users' table if it doesn't exist
  await usersModel.sync({ alter: true });
  return usersModel;
});

export async function writeUser(user: UserModel) {
  try {
    const client = await usersModel;
    await client.upsert(user);
  } catch (error) {
    console.error(
      `unable to write user: ${JSON.stringify(user)}. Received error:${error}`
    );
  }
}

export async function getUserById(id: string): Promise<Model<InferAttributes<UserModel>> | null | undefined> {
  try {
    const client = await usersModel;
    return await client.findByPk(id, { attributes: ['id', 'firstName', 'lastName'] });
  } catch (error) {
    console.error(`unable to get user:${id}. Received error:${error}`);
  }
}

export async function findAll(): Promise<Array<Model<InferAttributes<UserModel>>> | undefined> {
  try {
    const client = await usersModel;
    return  await client.findAll({ raw: true, attributes: ['id', 'firstName', 'lastName'] })
  } catch (error) {
    console.error(`unable to find all users. Received error:${error}`);
  }
}
