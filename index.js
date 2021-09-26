let libraryOfBooks = [];

function addToLibrary(bookObj) {
    libraryOfBooks.push(bookObj);
}

function book(title, author, pages, img) {
    this.title = "";
    this.author = "";
    this.pages = "";
    this.img = "";

    this.createBookElementOnPage = function() {
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
        metaData.textContent = `${title}, ${author}, ${pages}`;
        bookElement.appendChild(metaData);
    }
}

let book1 = new book("Lord of the Rings", "J.R. Tolkien", "1000", "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg");
book1.createBookElementOnPage();