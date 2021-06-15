const searchBook = document.querySelector("#searchBook")
searchBook.addEventListener('click', searchingBook)


async function searchingBook() {
    const search= document.getElementById("titleInput").value
    window.location.href = `/?title=${search}`
}

async function getBookInfo(id){
    try {
        const response = await fetch(`book/getBook?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        document.getElementById("bookModalTitle").innerHTML = data.title;
        document.getElementById("bookModalImage").src = data.image;
        document.getElementById("bookModalAuthor").innerHTML = data.author;
        document.getElementById("bookModalIsbn10").innerHTML = data.isbn10;
        document.getElementById("bookModalIsbn13").innerHTML = data.isbn13;
        document.getElementById("bookModalDescription").innerHTML = data.description;
    } catch (err) {
        console.log(err)
    }
}