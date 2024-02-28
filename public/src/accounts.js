function findAccountById(accounts, id) {
  // return account object by id
  return accounts.find((acct) => acct.id === id)
}

function sortAccountsByLastName(accounts) {
  // sort the accounts by last name
  return accounts.sort((acct1,acct2) => acct1.name.last > acct2.name.last ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  
  // loop through book borrows and filter out those borrows which match an account id
  // then add the length of the resulting array to a total
  for (let index = 0; index < books.length ; index++){
    const theseBorrows = books[index].borrows ;
    let bookBorrows = theseBorrows.filter((borrow) => borrow.id === account.id) ;
    total += bookBorrows.length ;
  }
  
  // return total
  return total; 
}

function getBooksPossessedByAccount(account, books, authors) {
  // initialize array
  let booksCheckedOut = [];

  // creates an array of books that have not been returned
  for (let index = 0; index < books.length ; index++){
    const theseBorrows = books[index].borrows ;
    let bookBorrows = theseBorrows.filter((borrow) => borrow.id === account.id && (borrow.returned === false))
    if(bookBorrows.length !== 0) {
      const thisBook = addBookToArray(books, authors, index);
      booksCheckedOut.push(thisBook)}
  }

  // returns that array
  return booksCheckedOut;
}

function addBookToArray(books, authors, index){
  // THIS IS A HELPER FUNCTION
  // for a certain book adds the book object to the matching author object
  let thisBook = books[index];
  const thisAuthorId = books[index].authorId
  thisBook["author"] = authors.find((author) => author.id === thisAuthorId);
  return thisBook;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
