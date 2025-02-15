const API_key='api_key=4fe810deb99e14072dbb3e55dd840e8b';
const Base_URL='https://api.themoviedb.org/3';
const API_URL=Base_URL + '/discover/movie?sort_by=popularity.desc&'+API_key;
const img_URL='https://image.tmdb.org/t/p/w500';
const searchURL=Base_URL+'/search/movie?'+API_key;


const moviebar=document.getElementById('moviebar');
const form=document.getElementById('form');
const search=document.getElementById('search');

getmovies(API_URL);

function getmovies(url){

    fetch(url).then(res=>res.json()).then(data=> {
        console.log(data.results)
        showmovies(data.results);
    })

}

function showmovies(data){
    moviebar.innerHTML='';

   data.forEach(movie => { 
       
      const {title, poster_path,vote_average,overview} = movie;
       const movieEl = document.createElement('div');
       movieEl.classList.add('movie');
       movieEl.innerHTML = `
       <img src="${img_URL+poster_path} " alt="${title}">
       <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getcolor(vote_average)}">${vote_average}</span>
       </div>
       <div class="overview">
           <h3>Overview</h3>
           ${overview}
           
       </div>

       `
     moviebar.appendChild(movieEl);  
   })
}



function getcolor(vote){
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm=search.value;

    if (searchTerm){
        getmovies(searchURL+'&query='+searchTerm);
    }
    else{
        getmovies(API_URL);
    }
})