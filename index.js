const myLibrary = [];
const elements = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages")
};
let counter = 0;

function showForm() {
    document.getElementById("form").style.display = "block";
    document.getElementById("newBookButton").style.display = "none";
}

function addBookToLibrary() {
    document.getElementById("form").style.display = "none";
    document.getElementById("newBookButton").style.display = "inline";
    const newBook = new Book();
    const row = table.insertRow();
    for (let key in elements) {
        let elementContent = elements[key].value;
        elements[key].value = "";
        newBook.setProp(key, elementContent);
        row.insertCell().innerHTML = elementContent;        
    }
    const readStatus = document.getElementById("read");
    const readCell = row.insertCell();
    console.log(readStatus.checked);
    readCell.innerHTML = readStatus.checked ? "read" : "not read";
    readCell.id = -(++counter);
    readStatus.checked = false;
    let button = document.createElement("button");
    button.innerHTML = "CHANGE STATUS";
    button.onclick = () => {changeStatus(button)};
    row.insertCell().appendChild(button);
    button = document.createElement("button");
    button.innerHTML = "DELETE";
    button.id = counter;
    button.onclick = () => {deleteBook(button)};
    row.insertCell().appendChild(button);
    newBook.setProp("id", counter)
    myLibrary.push(newBook);
}

function deleteBook(deleteButton) {
    deleteButton.parentElement.parentElement.remove();
    for (let book in myLibrary) {
        if (book.id === deleteButton.id) {
            const index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            break;
        }
    }
}

function changeStatus(changeButton) {
    const target = changeButton.parentElement.parentElement.children[3];
    target.innerHTML = target.innerHTML === "read" ? "not read" : "read";
}

class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
        this.setProp = (prop, val) => {
            this[prop] = val;        
        }
        this.info = () => {
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read ? "read" : "not read yet");
        };
    }
}