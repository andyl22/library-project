let libraryOfBooks = [];
let index = 0;

function addToLibrary(bookObj) {
  libraryOfBooks.push(bookObj);
}

function book(title, author, pages, img) {
  this.title = title;
  this.author = author
  this.pages = pages;
  this.img = img;

  this.createBookElementOnPage = function () {
    let bookElement = document.createElement("div");
    bookElement.classList.add("book");
    setCover(bookElement);
    setMetaData(bookElement);
    let bookList = document.getElementById("book-list");
    bookList.appendChild(bookElement);
  }

  function setCover(bookElement) {
    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", img);
    bookElement.appendChild(bookCover);
  }

  function setMetaData(bookElement) {
    let metaData = document.createElement("p");
    metaData.innerHTML = `${title}<br/> ${author}<br/> Pages: ${pages}`;
    bookElement.appendChild(metaData);
  }
}

let book1 = new book("Lord of the Rings", "J.R. Tolkien", "1000", "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg");
book1.createBookElementOnPage();
let book2 = new book("Lord of the Rings", "J.R. Tolkien", "1000", "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg");
book1.createBookElementOnPage();
let book3 = new book("Lord of the Rings", "J.R. Tolkien", "1000", "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg");
book1.createBookElementOnPage();


let modal = document.getElementById("modal");
let addButton = document.getElementById("add-button");
addButton.addEventListener("pointerdown", showModal);

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
  index++;
  let newBook = new book(title, author, pages, image);
  libraryOfBooks.push(newBook);
  libraryOfBooks[0].createBookElementOnPage();
}
