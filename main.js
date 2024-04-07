const subBtn = document.querySelector('#submitBtn')
const addBtn = document.querySelector('#addBtn')
const main = document.querySelector('main')
const sort = document.querySelector('#sort')

const libraryArr = []

subBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const inputs = document.querySelectorAll('.addBookDiv input')
    addingBook(inputs)
    displayLibrary(libraryArr)

})

addBtn.addEventListener('click', () => {

    const clone = document.querySelector('.addBookDiv').cloneNode(true)

    clone.classList.replace('addBookDiv','addBookPopUp')
    main.append(clone)
    
    const inputs = document.querySelectorAll('.addBookPopUp input')
    
    inputs.forEach(item =>{
        item.value =  typeof item.value === 'boolean' ? false : '' 
    })
    
  
    
    const subBtn = document.querySelector('.addBookPopUp button')
    
    subBtn.id = 'subPopUp'
    
    subBtn.addEventListener('click', () => {
        
        
        addingBook(inputs)
        displayLibrary(libraryArr)
        
    })

})

sort.addEventListener('change', () => {

    const libraryOg = [...libraryArr]

    let librarySort = []

    switch (sort.value){

        case 'pages' : librarySort = libraryOg.sort((a ,b) => a.pages -b.pages);break;
        case 'author': librarySort = libraryOg.sort((a,b) =>
                                    a.author.localeCompare(b.author));break;
        case 'title' : librarySort = libraryOg.sort((a,b) => 
                                    a.title.localeCompare(b.title) );break
        default : librarySort = [...libraryOg]
    }

    displayLibrary(librarySort)



})



function Book (author,title,pages,read){

    this.author = author
    this.title = title
    this.pages = pages
    this.read = read

}

function displayLibrary(libraryArr){
    main.textContent = ''
    libraryArr.forEach((item,index) => {

       const book = createBook(item,index)

        main.append(book)
    })

    main.append(addBtn)



}

function createBook(book,index){
    
    const bookCover = document.createElement('div')
    bookCover.classList.add('book')
    const author = document.createElement('p')
    const title = document.createElement('p')
    const pages = document.createElement('p')
    const read = document.createElement('p')

    const removeBtn = document.createElement('button')

    const readBtn = document.createElement('button')

    author.textContent = book.author
    title.textContent = book.title
    pages.textContent = 'Pages: ' + book.pages
    read.textContent = book.read === true ? 'read' : 'not read'

    removeBtn.textContent = 'X'
    readBtn.textContent = 'read?'

    removeBtn.addEventListener('click', () => {

        bookCover.remove()
        libraryArr.splice(index,1)

    })

    readBtn.addEventListener('click', () => {

        if(readBtn.textContent === 'read?'){

            bookCover.classList.add('bookRead')
            readBtn.textContent = 'read!'

        }else if(readBtn.textContent ==='read!'){
            bookCover.classList.remove('bookRead')
            readBtn.textContent = 'read?'
        }



         read.textContent = 
         read.textContent === 'read' ? 'not read' : 'read'

    })


    bookCover.append(removeBtn,author,title,pages,read,readBtn)

    return bookCover

}




function addingBook (inputs){

    let author
    let title
    let pages
    let read

    inputs.forEach(item => {


        switch (item.id){
            
            case 'pages' : pages = item.value;break;
            case 'author': author = item.value;break;
            case 'title' : title = item.value;break;
            case 'read'  : read = item.checked


        }

        item.value = '';

    })
    libraryArr.push(new Book(author,title,pages,read))
}































function test(num){
    const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

   function rdmString (){
        let str ='';
        
        for (let i = 0; i <9; i++){
            const rdmNum = Math.floor(Math.random()*abc.length)
            str += abc[rdmNum]
        }

        return str
    }


    for (let i = 0; i < num; i++){

        const author = rdmString()
        const title = rdmString()
        const pages = Math.floor(Math.random()*100)
        const read = pages % 2 === 0
    
        const book = new Book (author,title,pages,read)
        
        libraryArr.push(book)

    }

    displayLibrary(libraryArr)
}