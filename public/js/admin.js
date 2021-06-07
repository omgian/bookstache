const bookLookUp = document.querySelector("#bookLookUpButton")
bookLookUp.addEventListener('click', searchBook)


async function searchBook(){
    const isbn = document.getElementById("inputIsbn").value 
    // const cName = this.parentNode.childNodes[1].innerText
    // const iName = this.parentNode.childNodes[3].innerText
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch(`book/searchisbn?isbn=${isbn}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
          })
        const data = await response.json()
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("image").src = data.image;
        document.getElementById("author").innerHTML = data.author;
        document.getElementById("isbn10").innerHTML = data.isbn10;
        document.getElementById("isbn13").innerHTML = data.isbn13;
        document.getElementById("description").innerHTML = data.description;
        console.log(data)
    }catch(err){
        console.log(err)
    }
}