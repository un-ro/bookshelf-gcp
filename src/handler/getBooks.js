const books = require('./books');

const getBooks = (request, h) => {
  // [Optional] Query
  const {name, reading, finished} = request.query;
  let queryBook = books;

  // [Optional] Get by name
  if (name !== undefined) {
    queryBook = queryBook.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  // [Optional] Get by reading
  if (reading !== undefined) {
    queryBook = queryBook.filter((item) =>
      item.reading === !!reading,
    );
  }

  // [Optional] Get by finished
  if (finished !== undefined) {
    queryBook = queryBook.filter((item) =>
      item.finished === !!Number(finished),
    );
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
