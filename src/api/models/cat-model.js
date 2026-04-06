import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  return rows.length > 0 ? rows[0] : false;
};

const findCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [id]);
  return rows;
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename || 'default.jpg', birthdate || null];
  const [rows] = await promisePool.execute(sql, params);
  return { cat_id: rows.insertId };
};

const modifyCat = async (cat, id, user) => {
  let sql;
  if (user.role === 'admin') {
    // Admin saa muokata kaikkia
    sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
  } else {
    // Tavallinen käyttäjä vain omiaan
    sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`, [cat, id, user.user_id]);
  }
  const [rows] = await promisePool.execute(sql);
  return rows.affectedRows > 0 ? { message: 'success' } : false;
};

const removeCat = async (id, user) => {
  let sql;
  const params = [id];
  if (user.role === 'admin') {
    // Admin saa poistaa kaikki
    sql = `DELETE FROM wsk_cats WHERE cat_id = ?`;
  } else {
    // Tavallinen käyttäjä vain omansa
    sql = `DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?`;
    params.push(user.user_id);
  }
  const [rows] = await promisePool.execute(sql, params);
  return rows.affectedRows > 0 ? { message: 'success' } : false;
};

export { listAllCats, findCatById, findCatsByUserId, addCat, modifyCat, removeCat };