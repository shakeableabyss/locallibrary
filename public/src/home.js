function getTotalBooksCount(books) {
  // return the number of total books in array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // return the number of total accounts in array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // filter out an array of checked out books
  const checkedOut = books.filter((book) => book.borrows[0].returned === false);
  // return the length of the array (number of books)
  return checkedOut.length;
}

function getMostCommonGenres(books) {
  // intitialize genre array  
  let genres = [];
  
  // loop through and add 1 to an array of each genre each time that genre is hit
  for (let index = 0; index < books.length; index++){
    const thisGenre = books[index].genre;
    if (genres[thisGenre] === undefined) {
      genres[thisGenre] = 1;
    } else {
      genres[thisGenre] = genres[thisGenre] + 1;
    }
  }
  
  // initialize sorted genre array
  let sortedGenres = []

  // change the arrangement to sort it more easily
  for (let genre in genres){
    sortedGenres.push({"name": genre, "count": genres[genre]})
  }

  // sort the array
  let nextSortedGenres = sortedGenres.sort((genre1, genre2) => genre1.count > genre2.count ? -1 : 1)

  // get the top five
  let finalSortedGenres = returnTopFive(nextSortedGenres);
  
  // return the top five
  return finalSortedGenres;

}

function getMostPopularBooks(books) {
  // get an array of book ids and borrow count
  const nameAndCount = countBookBorrows(books);

  // sort that array by count
  const sortedBooks = nameAndCount.sort((book1, book2) => book1.count > book2.count ? -1 : 1)

  // get the top five of those
  const finalSortedBooks = returnTopFive(sortedBooks);

  // return the top five
  return (finalSortedBooks);
}

function getMostPopularAuthors(books, authors) {
  // get an array of book ids and borrow count
  const bookBorrows = countBookBorrows(books);

  // initialize array
  const authorBorrows = [];
  
  // really just using .reduce() to loop through an array, it's not used in an accumulator type way
  const result = bookBorrows.reduce((accumulator, borrow) => {
    const thisBook = books.find((book) => book.title === borrow.name);
    const thisAuthor = authors.find((author) => author.id === thisBook.authorId);
    const fullName = thisAuthor.name.first + " " + thisAuthor.name.last;
    if(authorBorrows[fullName] === undefined){
      authorBorrows[fullName] = borrow.count;
    }else{
      authorBorrows[fullName] += borrow.count;
    }
  })

  // rearrange the array to be sorted more easily
  let sortedAuthors1 = [];
  let indexAuthors = 0;
  for (let author in authorBorrows) {
    sortedAuthors1[indexAuthors] = {"name": author, "count": authorBorrows[author]}
    indexAuthors++;
  }
  
  // perform the sort
  const sortedAuthors2 = sortedAuthors1.sort((author1, author2) => author1.count > author2.count ? -1 : 1);
   
  // return the top five
  return returnTopFive(sortedAuthors2);

}

function returnTopFive(thisArray){
  // HELPER FUNCTION
  // takes any array
  // returns array [0] through [4]
  let finalArray = [];
  for (let index = 0; index < 5 && (index < thisArray.length); index++){
    finalArray[index] = thisArray[index];
  }
  return finalArray;
}

function countBookBorrows (books){
  // HELPER FUNCTION
  // takes array of book objects
  // returns array of {'name': name, 'count': count}
  
  const nameAndCount = books.map((book) => returnAnObject(book.title, book.borrows.length))
  
  return nameAndCount;
}


function returnAnObject(name, count){
  // HELPER FUNCTION
  // returns an object "name" and "count" 
  // this allows me to get around syntax limitations with the map() function
return {"name": name, "count": count};
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
