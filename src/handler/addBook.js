const {nanoid} = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
  // User data
  const {
    name, year, author, summary, publisher,
    pageCount, readPage, reading,
  } = request.payload;

  // Check user data first
  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku.' +
        ' readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Server generated
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Create new Book Data
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Add to array
  books.push(newBook);

  // Check if id is same with other
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  // If something wrong with server
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

module.exports = addBook;
