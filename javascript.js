const library = [];

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

function addBookToLibrary(){
  title=prompt("add title");
  author=prompt("add author");
  pages=prompt("add pages");
  read=prompt("is book read?");
  library.append(new book(title, author, pages, read));
}

function displayBooks(books){
    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");
    
    let head_elements = ['Title','Author','Pages','Read'];
    for (const element of head_elements){
        const cell = document.createElement("th");
        cell.textContent = element;
        tblHead.appendChild(cell);
    }  
    
    const tblBody = document.createElement("tbody");
    
    for(const book of books){
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
        tblBody.appendChild(row);
    }
    
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    
    document.body.appendChild(tbl);
}

library.push(new book('A Tale of Two Cities','Charles Dickens',123,true));
library.push(new book('The Little Prince','Antonie de Saint Exupery',222,true));
library.push(new book('The Alchemist','Paulo Coelho', 521, false));
console.log(library);

displayBooks(library);