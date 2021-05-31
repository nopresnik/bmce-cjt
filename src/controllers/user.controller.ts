import db from 'models';
import IController from 'types/IController';

const getAllUsers: IController = async (req, res) => {
  try {
    const users = await db.User.find({});
    res.json(users);
  } catch (e) {
    res.json(e);
  }
};

export default { getAllUsers };
