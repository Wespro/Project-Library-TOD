let myLibrary = [];

function Book(title, author, numPages, isRead, bookKey) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
  this.bookKey = bookKey;
}
//Variables
const addBookBtn = document.querySelector("#addBookBtn");
const form = document.querySelector("form");
const bodyDim = document.querySelector("#bodyDim");
const submitBtn = document.getElementById("submitBtn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numPagesInput = document.getElementById("numPages");
const isReadInput = document.querySelector("#isRead");
const cards = document.querySelector(".cards");

function addToBookLibrary(e) {
  if (!titleInput.value || !authorInput.value || !numPagesInput.value) {
    return;
  } else {
    e.preventDefault();
    const newBook = new Book(
      titleInput.value,
      authorInput.value,
      numPagesInput.value,
      isReadInput.checked ? "Read it" : "Read it soon",
      `Card ${myLibrary.length}`
    );
    myLibrary.push(newBook);
    //empty the cards to redisplay
    cards.replaceChildren();
    //display myLibrary
    myLibrary.forEach((element, index) => {
      //creating the elemnts of the book card
      const bookCard = document.createElement("div");
      const bookTitle = document.createElement("h3");
      const bookAuthor = document.createElement("h3");
      const bookNumPages = document.createElement("h3");
      const beenReadBtn = document.createElement("button");
      const removeBtn = document.createElement("button");
      const fragment = document.createDocumentFragment();
      //add classes and ids
      bookCard.classList.add("card");
      bookCard.setAttribute("data-number", `Card ${index}`);
      beenReadBtn.setAttribute("id", "beenRead");
      removeBtn.setAttribute("id", "remove");

      //provindg the content
      bookTitle.innerText = `Title: ${element.title}`;
      bookAuthor.innerText = `Author: ${element.author}`;
      bookNumPages.innerText = `Numper of Pages: ${element.numPages}`;
      beenReadBtn.innerText = element.isRead;
      removeBtn.innerText = ` Remove`;
      //adding the elements
      fragment.append(
        bookTitle,
        bookAuthor,
        bookNumPages,
        beenReadBtn,
        removeBtn
      );
      bookCard.appendChild(fragment);
      cards.append(bookCard);

      closeForm();
      // toggle read it buttnon

      beenReadBtn.addEventListener("click", function (e) {
        if (e.target.innerText === "Read it") {
          e.target.innerText = `Read it soon `;
        } else {
          e.target.innerText = `Read it`;
        }
      });

      // remove card

      removeBtn.addEventListener("click", function (e) {
        console.log(bookCard.getAttribute("data-number"));
        console.log(myLibrary[index].bookKey);
        if (bookCard.getAttribute("data-number") === myLibrary[index].bookKey) {
          bookCard.remove();
          myLibrary.splice(index, 1);
        }
      });
    });
  }
}

submitBtn.addEventListener("click", addToBookLibrary);
//form pop event
addBookBtn.addEventListener("click", function (e) {
  form.classList.remove("closeForm");
  form.classList.add("openForm");
  bodyDim.classList.add("formOpened");
});

//form pop close
bodyDim.addEventListener("click", closeForm);
function closeForm(e) {
  form.classList.add("closeForm");
  form.classList.remove("openForm");
  bodyDim.classList.remove("formOpened");
  titleInput.value = "";
  authorInput.value = "";
  numPagesInput.value = "";
}
