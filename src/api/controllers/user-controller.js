import bcrypt from 'bcrypt';
import { addUser, findUserById, listAllUsers, modifyUser, removeUser } from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  if (req.body.password) {
    const saltRounds = 10;
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  }
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201).json({ message: 'New user added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  // OHJEIDEN KOHTA 15: Tarkistetaan onko käyttäjä itse TAI admin
  if (res.locals.user.user_id === Number(req.params.id) || res.locals.user.role === 'admin') {
    const result = await modifyUser(req.body, req.params.id);
    if (result) {
      res.json({ message: 'User updated.' });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.status(403).json({ message: 'Forbidden: You can only update your own info' });
  }
};

const deleteUser = async (req, res) => {
  // Samat säännöt poistoon
  if (res.locals.user.user_id === Number(req.params.id) || res.locals.user.role === 'admin') {
    const result = await removeUser(req.params.id);
    if (result) {
      res.json({ message: 'User deleted.' });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };