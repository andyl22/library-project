let libraryOfBooks = [];
let id = 0;

function addToLibrary(bookObj) {
  libraryOfBooks.push(bookObj);
  id++;
}

function book(title, author, pages, img, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.id = id;
  this.displayed = false;
  this.read = false;

  this.createBookElementOnPage = function () {
    if(this.displayed==true) {return};
    let bookElement = createContainer(id);
    setupCover(bookElement);
    let bookInfoContainer = createInfoContainer(bookElement);
    setupMetaData(bookInfoContainer);
    createDeleteButton(bookInfoContainer);
    createReadCheck(bookElement);
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
    metaData.innerHTML = `Title: ${title}<br/>Author: ${author}<br/>Pages: ${pages}`;
    metaData.classList.add("meta-data")
    bookInfoContainer.appendChild(metaData);
  }

  function addToLibrary(bookElement) {
    let bookList = document.getElementById("book-list");
    bookList.appendChild(bookElement);
  }

  function createDeleteButton(bookInfoContainer) {
    let deleteButton = document.createElement("p");
    deleteButton.classList.add("delete-book-button");
    deleteButton.textContent = "Remove";
    bookInfoContainer.appendChild(deleteButton);
  }

  function createReadCheck(bookElement) {
    let checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container")
    let readCheckbox = document.createElement("input");
    let labelForCheckbox = document.createElement("label");
    let labelID = id;
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.setAttribute("id", labelID);
    labelForCheckbox.setAttribute("for", labelID);
    labelForCheckbox.textContent = "Read?";
    checkboxContainer.appendChild(labelForCheckbox);
    checkboxContainer.appendChild(readCheckbox);
    bookElement.append(checkboxContainer);
    readCheckbox.addEventListener("change", toggleReadStatus);
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
  addToLibrary(newBook);
  displayBooks();
}

function displayBooks() {
  libraryOfBooks.forEach(book => {
    book.createBookElementOnPage();
    book.displayed = true;
  });
}

function toggleReadStatus(e) {
  let bookContainer = e.path[2];
  let idNumber = bookContainer.getAttribute("data-id-number");
  let selectedBook = libraryOfBooks.find((obj=> {return obj["id"]==idNumber}));
  selectedBook.read = !selectedBook.read;
  (selectedBook.read) ? bookContainer.classList.add("read") : bookContainer.classList.remove("read");
  toggleRemoveButton(e);
}

function toggleRemoveButton(e) {
  if (e.srcElement.checked == true) {
    let removeButton = e.path[2].querySelector(".book-info-container .delete-book-button");
    removeButton.textContent = "Finished";
    removeButton.removeEventListener("pointerdown", removeBookElementOnPage);
    removeButton.classList.remove("delete-book-button");
    removeButton.classList.add("complete");
  } else {
    let removeButton = e.path[2].querySelector(".book-info-container .complete");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("pointerdown", removeBookElementOnPage);
    removeButton.classList.remove("complete");
    removeButton.classList.add("delete-book-button");
  }
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

let newBook1 = new book("The 13½ Lives of Captain Bluebear", "Walter Moers", "457", "https://images.gr-assets.com/books/1366154303l/291872.jpg", 0);
let newBook2 = new book("The Language of Thorns: Midnight Tales and Dangerous Magic", "Leigh Bardugo", "457", "https://th.bing.com/th/id/OIP.99L1OLhqzRYl8jULh9U4TQHaLB?pid=ImgDet&rs=1", 1);
let newBook3 = new book("Stoner", "John Edward Williams", "278", "https://s-usih.org/wp-content/uploads/2015/11/Stoner-John-Williams.jpg", 2);
addToLibrary(newBook1);
addToLibrary(newBook2);
addToLibrary(newBook3);
displayBooks();
console.log(id);
