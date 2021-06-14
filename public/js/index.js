const searchBook = document.querySelector("#searchBook")
searchBook.addEventListener('click', searchingBook)


async function searchingBook() {
    const search= document.getElementById("titleInput").value
    window.location.href = `/?title=${search}`
}