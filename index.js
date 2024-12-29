const accessKey="6YSqLQfGOvtM-mXyrZ6qOPhH7A-TNvyD04IDI39p8lg"

const formEl = document.querySelector('form')
const serchInputEl =document.getElementById('search-input')
const searchResultsEl = document.querySelector('.search-results')
const showMoreButtonEl = document.getElementById('show-more-button')

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = serchInputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
   console.log(url)
   const response = await fetch(url)
   const data = await response.json()
   if(page ===1){
    searchResultsEl.innerHTML='';
   }
   const results = data.results
   results.map((result)=>{
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('search-result')
    const image=document.createElement('img')
    image.src = result.urls.small
    image.alt= result.alt_description;
    const imageLink = document.createElement('a')
    imageLink.href=result.links.innerHTML
    imageLink.target="_blank"
    imageLink.textContent=result.alt_description;
    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    searchResultsEl.appendChild(imageWrapper)
 
   })

   page++


if(page > 1){
    showMoreButtonEl.style.display ="block"
}


}



formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
     page= 1;
    searchImages();

})

showMoreButtonEl.addEventListener('click',()=>{
searchImages()
})