const library = [];
let currentId = 0;

const tbl = document.createElement("table");
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");

function book(title, author, pages, read){
    this.title= title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id=currentId++;

    this.info= function info(){
    let message=`${this.title} ${this.author}, ${this.pages} pages, `
    if(read)
        message+="read";
    else
        message+="not read yet"
    return message;
  }
}

function addRow(tblBody, book){
    const row = document.createElement("tr");
    row.setAttribute("id","book"+book.id);
    for(book_property of [book.title,book.author,book.pages]){
        const cell = document.createElement("td");
        cell.textContent = book_property;
        row.appendChild(cell);
    }

    addReadButton(row, book.read, book.id);
    addDeleteButton(row, book.id);

    tblBody.appendChild(row);
}

function addReadButton(row, isBookRead, bookId){
    const cell = document.createElement("td");
    const button = document.createElement("button");
    cell.setAttribute("style","text-align:center;");
    button.setAttribute("class","table-btn");
    button.setAttribute("book-id", bookId);
    if(isBookRead)
        button.textContent = 'Unread';
    else
        button.textContent = 'Read';

    button.addEventListener("click", (e)=>{
        const id = parseInt(e.currentTarget.getAttribute("book-id"));
        let bookIndex = library.findIndex(book => book.id === id);
        let book = library[bookIndex];
        book.read = !book.read;
        e.currentTarget.textContent = book.read ? "Unread" : "Read";
    })
    
    cell.appendChild(button);
    row.appendChild(cell);
}

function addDeleteButton(row, bookId){
    const cell = document.createElement("td");
    const button = document.createElement("button");
    cell.setAttribute("style","text-align:center;");
    button.setAttribute("class","remove-btn table-btn");
    button.setAttribute("book-id", bookId);
    button.textContent = "Remove";

    button.addEventListener("click", (e)=>{
        const id = parseInt(e.currentTarget.getAttribute("book-id"));
        library.splice(library.findIndex(book => book.id === id),1);
        document.getElementById("book"+id).remove();
    })
    
    cell.appendChild(button);
    row.appendChild(cell);
}

function displayBooks(books){   
    const head_elements = ['Title','Author','Pages','Read','Remove Book'];
    for (const element of head_elements){
        const cell = document.createElement("th");
        cell.textContent = element;
        tblHead.appendChild(cell);
    }  
    
    for(i in books){
        addRow(tblBody, books[i], i);
    }
    
    tbl.append(tblHead, tblBody);

    document.body.appendChild(tbl);
}

function addBookToLibrary(properties){
    library.push(new book(properties[0], properties[1], properties[2], false));
    addRow(tblBody, library[library.length-1]);
}

library.push(new book('A Tale of Two Cities','Charles Dickens',123,true));
library.push(new book('The Little Prince','Antonie de Saint Exupery',222,true));
library.push(new book('The Alchemist','Paulo Coelho', 521, false));

displayBooks(library);

const addBookBtn = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector(".confirm-button");

addBookBtn.addEventListener("click",(e)=>{
    dialog.showModal();
})

dialog.addEventListener("close", (e)=>{
    e.preventDefault();
    document.querySelector("form").reset();
})

confirmBtn.addEventListener("click",()=>{
    let properties = Array.from(dialog.querySelectorAll("input")).map(input => input.value);
    addBookToLibrary(properties);
    dialog.close();
})