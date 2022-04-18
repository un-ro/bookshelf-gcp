const books = require('./books');

const getBooks = (request, h) => {
  // [Optional] 1: Query
  const { name, reading, finished } = request.query;
  let queryBook = books;

  if (name !== undefined) {
    queryBook = queryBook.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
  }

  // To convert int to boolean I refer to https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/
  if (reading !== undefined) {
    queryBook = queryBook.filter((item) => item.reading === !!reading);
  }

  if (finished !== undefined) {
    queryBook = queryBook.filter((item) => item.finished === !!Number(finished));
  }

  return h.response({
    status: 'success',
    data: {
      books: queryBook.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
    code: 200,
  });
};

module.exports = getBooks;