import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  return rows.length > 0 ? rows[0] : false;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0] : false;
};

const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  
  const params = [
    name || 'Ei nimeä',
    username || 'kayttaja' + Date.now(),
    email || 'testi@testi.fi',
    password || 'oletussalasana',
    role || 'user'
  ];

  const [rows] = await promisePool.execute(sql, params);
  return { user_id: rows.insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
  const [rows] = await promisePool.execute(sql);
  return rows.affectedRows > 0 ? { message: 'success' } : false;
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [rows] = await connection.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    await connection.commit();
    return rows.affectedRows > 0 ? { message: 'success' } : false;
  } catch (error) {
    await connection.rollback();
    return false;
  } finally {
    connection.release();
  }
};

export { listAllUsers, findUserById, findUserByUsername, addUser, modifyUser, removeUser };