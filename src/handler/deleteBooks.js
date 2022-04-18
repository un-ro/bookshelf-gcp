const books = require('./books');

const deleteBook = (request, h) => {
  // Get id from parameter path
  const { bookId } = request.params;

  // Search Book index based on id
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    // Delete from array
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = deleteBook;