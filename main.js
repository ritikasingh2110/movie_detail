const apiKey = "6d88214b";
let cart=JSON.parse(localStorage.getItem("watch")) || []
async function searchMovie() {
    const movieName = document.getElementById('movieInput').value;
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = '';

    if (movieName.trim() === '') {
        movieContainer.innerHTML = '<p>Please enter a movie name!</p>';
        return;
    }

    const res = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
    const data = await res.json();

    if (data.Response === "False") {
        movieContainer.innerHTML = `
          <h3>Movie not found!</h3>`;
    } else {
        const recommended = data.imdbRating > 8.5 ? 'Recommended ⭐' : '';
        
        let card=document.createElement("div");
        card.className = 'movie-card'
        let img=document.createElement("img");
        img.setAttribute("src",data.Poster);

        let title=document.createElement("h2")
        title.innerText=`${data.Title}`;

        let r=document.createElement("h3")
        r.innerText=`${recommended}`;
        r.className="recom"
        let rel=document.createElement("p");
        rel.innerText=`Released: ${data.Released}`

        let rate=document.createElement("p");
        rate.innerText=`IMDb Rating: ${data.imdbRating}`

        let gen=document.createElement("p");
        gen.innerText=`Genre: ${data.Genre}`

        let car=document.createElement("button")
        car.innerHTML=`Add to WatchList <i class="fa-solid fa-hand-holding-heart"></i>`;
        car.className="ad"
        car.addEventListener("click",function(){
            if (!cart.includes(data.Title)) {
                cart.push(data.Title);
                localStorage.setItem('watch', JSON.stringify(cart));
                alert(`${data.Title} added to Watch Later!`);
            } else {
                alert(`${data.Title} is already in Watch Later!`);
            }
          console.log("pushed");
        })
        
        card.append(img,title,r,rel,rate,gen,car)
        document.querySelector("#movieContainer").append(card);
    }
}
document.getElementById("movieInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchMovie();
    }
});


