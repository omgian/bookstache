// const favBook = document.querySelector(".favId")
// favBook.addEventListener('click', toggleFavorite)

async function toggleFavorite(id) {
    // console.log('id', id)
    // const id = document.getElementByClass("favId").value
    try {
        const response = await fetch(`book/toggleFavoriteBook?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('toggle',data)
        if (data.status === 'saved'){
            window.location.href = "/feed"
        }
    } 
    catch (err) {
        console.log(err)
    }
}

async function deleteBook(id) {
    try {
        const response = await fetch(`book/deleteBook?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log('delete',data)
        if (data.status === 'deleted'){
            window.location.href = "/feed"
        }
    } 
    catch (err) {
        console.log(err)
    }
}