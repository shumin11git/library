let books = [];
let stand = document.querySelector('#book-stand');
let newBookForm = document.forms['newbook-form'];
//book counter
let lastIndex = 0;

//event listener for form submission
newBookForm.addEventListener('submit', getValues);

//create new book with form contents
function getValues(event) {
    event.preventDefault();
    let book = new Book(this);
    books.push(book);
    createBookCard(book);
    lastIndex += 1;
}
//book constructor function
function Book(form) {
    this.title = form.title.value,
    this.author = form.author.value,
    this.pages = form['page-count'].value,
    this.alreadyRead = form['already-read'].value,
    this.index = lastIndex + 1
}
function createBookCard(book) {
    let bookCard = document.createElement('div');
    //start creating HTML content for bookCard
    let bookHTML = `<div 
                        class="book-card" 
                        id="book-${book.index}"
                    >`;
    //add a <p> element to bookCard for each property in book
    for (let prop in book) {
        bookHTML += `<p 
                        class="book-property book-${prop}"
                        >${book[prop]}<
                        /p>`;
    };
    //add buttons to bookCard
    bookHTML += `<button 
                    class="toggle-read-button" 
                    id="toggle${book.index}"
                    >Toggle read<
                    /button>
                <button 
                    class="remove-book-button" 
                    id="remove${book.index}"
                    >Remove<
                    /button>`
    bookHTML += '</div>';
    //insert HTML content to bookCard
    bookCard.innerHTML = bookHTML;
    //append the bookCard element to the "stand" on screen
    stand.appendChild(bookCard);
    // add event listener to removeBookButton
    let removeBookButton = 
            document.querySelector(`#remove${book.index}`);
    removeBookButton.addEventListener('click', e => {
        e.target.parentElement.remove();
        books.splice(
            books.findIndex(item => item.index === book.index)
            , 1);
    });
    // add event listener to toggleReadButton
    let toggleReadButton = 
        document.querySelector(`#toggle${book.index}`);
    toggleReadButton.addEventListener('click', () => {
        book.alreadyRead === 'Yes' ? 
            book.alreadyRead = 'No' : 
            book.alreadyRead = 'Yes' ;
        let alreadyReadDisplay = 
            document.querySelector(`#book-${book.index} > .book-alreadyRead`);
        alreadyReadDisplay.textContent = book.alreadyRead;
    })
}