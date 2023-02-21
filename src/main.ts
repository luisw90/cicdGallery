const add = (a :number, b : number) => a + b;
const state : string[] = [];
let count: number = 1;
type Photo = {
  urls: { small:string },
  alt_description: string
};

const fetchData = async () => {
  const searchbar : HTMLInputElement = document.querySelector('#search-bar')!;
  const search = searchbar.value;
  document.querySelector('#main-container__images')!.innerHTML = '';
  state.unshift(search);
  window.localStorage.setItem('searchKey', state.toString());

  const photos = await fetch(`https://api.unsplash.com/search/photos?page=${count}&query=${search}&client_id=${import.meta.env.VITE_ACCESS_KEY}`);
  const data = await photos.json();
  console.log(data);
  data.results.forEach((photo: Photo) => {
    document.querySelector('#main-container__images')!.innerHTML += `
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="main-containter__photo" src="${photo.urls.small}" alt="${photo.alt_description}">
        </div>
        <div class="flip-card-back">
          <h1>Unsplash link</h1>
          <p>photographer name</p>
          <p>photographer profile link</p>
        </div>
      </div>
     </div>`
  });
};
const renderSearchResults = (localStorageData: string[]) => {
  document.querySelector('#ul-element')!.innerHTML = '';
  localStorageData.slice(0, 3).map((searchTerm: string) => {
    document.querySelector('#ul-element')!.innerHTML+=`
      <li>${searchTerm}</li>
    `
  })
  if (state.length !== 0) {
    document.querySelector('#input-container__outer')!.classList.add('input-container__outer');
  }
}
document.querySelector("#search-bar")?.addEventListener('click', () => {
  renderSearchResults(state)
} );

document.querySelector('#search-btn')?.addEventListener('click', () => {
  count = 1;
  fetchData();
  document.querySelector('#next-btn')?.classList.remove('hidden');
});

document.querySelector('#prev-btn')?.addEventListener('click', () => {
  if(count > 1) {
    count--
    fetchData();
  }
  if(count === 1) {
    document.querySelector('#prev-btn')?.classList.add('hidden')
  }
})
document.querySelector('#next-btn')?.addEventListener('click', () => {
    count++
    fetchData();
    document.querySelector('#prev-btn')?.classList.remove('hidden')
})
// document.querySelector('.main-container')?.addEventListener('click', () => {
//   document.querySelector('#input-container__outer')!.classList.remove('input-container__outer');
// })




export { add };
