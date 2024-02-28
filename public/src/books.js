function findAuthorById(authors, id) {
  // return the author object by id parameter
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  // return the book object by id parameter
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {

  // initialize arrays
  const borrowedBooks = [];
  const notBorrowedBooks = [];

  // loop through all books and increment one of two arrays depending if the book is borrowed or not
  for (let index = 0; index < books.length ; index++){
    const theseBorrows = books[index].borrows;
    if (theseBorrows[0].returned === false) {
      borrowedBooks.push(books[index]);
    } else {
      notBorrowedBooks.push(books[index]);
    }
  }

  // return an array of the above two arrays
  return [borrowedBooks, notBorrowedBooks];
}

function getBorrowersForBook(book, accounts) {
  // intialize arrays
  const bookBorrows = book.borrows;
  const finalList = [];

  // determine if the book is returned and if not push the account into the array of borrowers
  for (let index = 0; (index < accounts.length) && (finalList.length < 10); index++){
    const thisBorrow = bookBorrows.find((borrow) => accounts[index].id === borrow.id);
    if (thisBorrow !== undefined) {
      let accountObject = accounts[index];
      accountObject["returned"] = thisBorrow.returned;
      finalList.push(accountObject)
    } 
  }

  // return array of borrowers
  return finalList;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
