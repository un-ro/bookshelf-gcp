const books = require('./books');

const detailBook = (request, h) => {
  // Get id from parameter path
  const { bookId } = request.params;

  // Search item based on Id
  const book = books.filter((item) => item.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
      code: 200,
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

module.exports = detailBook;