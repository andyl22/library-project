let libraryOfBooks = [];
let id = 0;

function addToLibrary(bookObj) {
  libraryOfBooks.push(bookObj);
}

function book(title, author, pages, img, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.id = id;
  this.displayed = false;

  this.createBookElementOnPage = function () {
    if(this.displayed==true) {return};
    let bookElement = createContainer(id);
    setupCover(bookElement);
    let bookInfoContainer = createInfoContainer(bookElement);
    setupMetaData(bookInfoContainer);
    createDeleteButton(bookInfoContainer);
    addToLibrary(bookElement);
    bookElement.getElementsByClassName("delete-book-button")[0].addEventListener("pointerdown", removeBookElementOnPage);
  }

  function createContainer() {
    let bookElement = document.createElement("div");
    bookElement.setAttribute("data-id-number", id);
    bookElement.classList.add("book");
    return bookElement;
  }

  function createInfoContainer(bookElement) {
    let bookInfoContainer = document.createElement("div");
    bookInfoContainer.classList.add("book-info-container");
    bookElement.appendChild(bookInfoContainer);
    return bookInfoContainer;
  }

  function setupCover(bookElement) {
    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", img);
    bookElement.appendChild(bookCover);
  }

  function setupMetaData(bookInfoContainer) {
    let metaData = document.createElement("p");
    metaData.innerHTML = `${title}<br/> ${author}<br/> Pages: ${pages}`;
    metaData.classList.add("meta-data")
    bookInfoContainer.appendChild(metaData);
  }

  function addToLibrary(bookElement) {
    let bookList = document.getElementById("book-list");
    bookList.appendChild(bookElement);
  }

  function createDeleteButton(bookElement) {
    let deleteButton = document.createElement("p");
    deleteButton.classList.add("delete-book-button");
    deleteButton.textContent = "✖";
    bookElement.appendChild(deleteButton);
  }

}

function showModal() {
  modal.style.setProperty("display", "flex");
  let submitButton = document.getElementsByClassName("add-submit")[0];
  submitButton.addEventListener("click", submitAdd);
  let closeButton = document.getElementsByClassName("close")[0];
  closeButton.addEventListener("pointerdown", closeModal);
  window.addEventListener("click", function (e) {
    (e.target.id == "modal") ? closeModal() : false;
  });
}

function closeModal() {
  let textInputs = Array.from(document.getElementsByClassName("modal-text-input"));
  textInputs.forEach(textbox => textbox.value = "");
  modal.style.setProperty("display", "none");
}

function submitAdd(e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let image = document.getElementById("image").value;
  let newBook = new book(title, author, pages, image, id);
  id++;
  libraryOfBooks.push(newBook);
}

function displayBooks() {
  libraryOfBooks.forEach(book => {
    book.createBookElementOnPage();
    book.displayed = true;
  });
}

function removeBookElementOnPage(e) {
  let idNumber = e.path[2].getAttribute("data-id-number");
  let arrayIndex = libraryOfBooks.findIndex(obj=> {return obj["id"]==idNumber});
  libraryOfBooks.splice(arrayIndex,1);
  e.path[2].remove();
}

let modal = document.getElementById("modal");
let addButton = document.getElementById("add-button");
addButton.addEventListener("pointerdown", showModal);
let displayButton = document.getElementById("display-button");
displayButton.addEventListener("pointerdown", displayBooks);
