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
    
    let head_elements = ['title','author','pages','read'];
    for (const element of head_elements){
        const cell = document.createElement("th");
        console.log(element);
        cell.textContent = element; //tu może być błąd może lepiej użyć create text node
        tblHead.appendChild(cell);
    }  
    
    const tblBody = document.createElement("tbody");
    
    for(const book of books){
        const row = document.createElement("tr");
        for(book_property of [book.title,book.author,book.pages,book.read]){
            const cell = document.createElement("td");
            cell.textContent = book_property;
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    
    document.body.appendChild(tbl);
}

displayBooks(library);