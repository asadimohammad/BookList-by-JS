//classes
class BookList{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
        
    }
} 

class PrintMessage{
    showMessage(message,className){
        let messageTag = document.querySelector('.msg')
        messageTag.style.display = 'flex'
        messageTag.innerHTML = message
        messageTag.classList.add('center' , className)
        
        setTimeout(() => {
            messageTag.style.display = 'none'
            messageTag.classList.remove(className)
        }, 2000);

    }
    showLoader(){
        let loader = document.querySelector('.progress')
        loader.style.display = 'block'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 2000);
    }
        ResetInputs(){
            title.value = ''
            author.value = ''
            isbn.value = ''
        }
}


//variablescon
let bookList;
let afterAddBook = new PrintMessage()
let title = document.querySelector('#title')
let author = document.querySelector('#author')
let isbn = document.querySelector('#isbn')
let btnAddBook = document.querySelector('.btn')
let table = document.querySelector('.t-body')

//EventListener
EventListener()
 function EventListener(){
    document.addEventListener('DOMContentLoaded' , onLoadFromLS)
    btnAddBook.addEventListener('click' , addBook)
    table.addEventListener('click' , removeBookFromTable)
 }
 
//Functions
 function addBook(e){
     e.preventDefault()
     bookList = new BookList(title.value,author.value,isbn.value)
     if (bookList.title !=='' && bookList.author !=='' && bookList.isbn !=='') {
     setTimeout(() => {
                
            
            let tableRow = ''
            tableRow +=`
            <tr>
            <td>${title.value}</td>
            <td>${author.value}</td>
            <td>${isbn.value}</td>
            <td><a href="#"><i class="material-icons">cancel</i></a></td>
            </tr>
            `
            table.insertAdjacentHTML('afterbegin', tableRow);
            
            afterAddBook.ResetInputs()
            afterAddBook.showMessage('Your Book added in List', 'msg-success')
            addToLocalStorage(bookList)
            
        }, 2000);
        afterAddBook.showLoader()
        } else {
            afterAddBook.showMessage('Please fill all field', 'msg-error')
            }
}

 function removeBookFromTable(e){
     e.preventDefault()
     if (e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('t-body')) {
        e.target.parentElement.parentElement.parentElement.remove()
     }
     removeBookFromLS(e.target.parentElement.parentElement.parentElement)
 }
 
 function addToLocalStorage(book){
    let books;
    if(localStorage.getItem("books") === null){
        books = []
    }else{
        books = JSON.parse(localStorage.getItem("books"))
    }
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books));
 }
 function onLoadFromLS(){
   let bookFromLS = JSON.parse(localStorage.getItem('books'))
   for (const key in bookFromLS) {
       if (bookFromLS[key].title !=='' && bookFromLS[key].author !=='' && bookFromLS[key].isbn !=='') {
            let tableRow = ''
            tableRow +=`
            <tr>
            <td>${bookFromLS[key].title}</td>
            <td>${bookFromLS[key].author}</td>
            <td>${bookFromLS[key].isbn}</td>
            <td><a href="#"><i class="material-icons">cancel</i></a></td>
            </tr>
            `
            table.insertAdjacentHTML('afterbegin', tableRow);

   }
   }
}

function removeBookFromLS(book) {
    let books;
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }

    books.forEach(function(value, index) {
        if (book.children[0].textContent === value.title) {
            console.log(book.firstChild.textContent , index , value.title);
            books.splice(index, 1);
        }
    });

    localStorage.setItem("books", JSON.stringify(books));
}