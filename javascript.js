const library = [];

const tbl = document.createElement("table");
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");

function book(title, author, pages, read){
  this.title= title;
  this.author=author;
  this.pages=pages;
  this.read=read;

  this.info= function info(){
    let message=`${this.title} ${this.author}, ${this.pages} pages, `
    if(read)
        message+="read";
    else
        message+="not read yet"
    return message;
  }
}

function addRow(tblBody, book, rowNumber){
    const row = document.createElement("tr");
    for(book_property of [book.title,book.author,book.pages]){
        const cell = document.createElement("td");
        cell.textContent = book_property;
        row.appendChild(cell);
    }
    const cell = document.createElement("td");
    if(book.read)
        cell.textContent = 'Yes';
    else
    cell.textContent = 'No';
    row.appendChild(cell);

    addReadButton(row, book.read, rowNumber);

    tblBody.appendChild(row);
}

function addReadButton(row, isBookRead, rowNumber){
    const cell = document.createElement("td");
    const button = document.createElement("button");
    cell.setAttribute("style","text-align:center;");
    button.setAttribute("style","width:70%; border-radius:5px;");
    button.setAttribute("number",rowNumber);
    if(isBookRead)
        button.textContent = 'Unread';
    else
        button.textContent = 'Read';
    button.attribute

    button.addEventListener("click", (e)=>{
        let bookNumber = e.currentTarget.getAttribute("number");
        console.log(bookNumber);
        library[bookNumber].read = !library[bookNumber].read;
        if(library[bookNumber].read)
            e.currentTarget.textContent = "Unread";
        else
            e.currentTarget.textContent = "Read";
    })
    
    cell.appendChild(button);
    row.appendChild(cell);
}

function displayBooks(books){   
    let head_elements = ['Title','Author','Pages','Read'];
    for (const element of head_elements){
        const cell = document.createElement("th");
        cell.textContent = element;
        tblHead.appendChild(cell);
    }  
    
    for(i in books){
        addRow(tblBody, books[i], i);
    }
    
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);

    document.body.appendChild(tbl);
}

function addBookToLibrary(properties){
    library.push(new book(properties[0], properties[1], properties[2], false));
    addRow(tblBody, library[library.length-1], library.length-1);
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
    let properties = Array.from(dialog.querySelectorAll("input")).map(input => input.value);
    addBookToLibrary(properties);

    document.querySelector("form").reset();
})

