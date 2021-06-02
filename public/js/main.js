const thumbText = document.querySelector("#bookLookUp") 
thumbText.addEventListener('click', searchBook)


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
        console.log(data)

    }catch(err){
        console.log(err)
    }
}