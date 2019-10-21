const apiKey = 'ebea8cfca72fdff8d2624ad7bbf78e4c';
let saveMovieArray = [];
const getRequestUrl = (pageId) =>
    (`http://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageId}`);

let selectedMovieId = null;
let selectedPage = 1;
let lastPage = 68;

const clearMovieContainer = () => {
    const a = document.querySelector('.content');

    a.innerHTML = '';
};

const addHandleNextPage = () => {
    const button = document.querySelector('.next_button');

    button.onclick = handleNextPage;
    if (selectedPage === 68) {
        button.onclick = null;
    }
};

const handleNextPage = () => {
    selectedPage += 1;
    sendRequest(selectedPage);
};

const addHandleFirstPage = () => {
    const button = document.querySelector('.first_button');

    button.onclick = handleFirstPage;
    if (selectedPage === 1) {
        button.onclick = null;
    }
};

const handleFirstPage = () => {
    selectedPage = 1;
    sendRequest(selectedPage);
};

const addHandlePreviousPage = () => {
    const button = document.querySelector('.previous_button');

    button.onclick = handlePreviousPage;
    if (selectedPage === 1) {
        button.onclick = null;
    }
};

const handlePreviousPage = () => {
    selectedPage = selectedPage - 1;
    sendRequest(selectedPage);
};

const addHandleLastPage = () => {
    const button = document.querySelector('.last_button');

    button.onclick = handleLastPage;
    if (selectedPage === 68) {
        button.onclick = null;
    }
};

const handleLastPage = () => {
    selectedPage = lastPage;
    sendRequest(selectedPage);

};

const addHandleCurrentPage = () => {
    const button = document.querySelector('.current_page');

    button.textContent = +selectedPage;
};

const addHandlePreviousNumberPage = () => {
    const button = document.querySelector('.previous_number');

    button.onclick = handlePreviousNumberPage;
    button.textContent = (+selectedPage - 1);
    if (selectedPage === 1) {
        button.textContent = '';
        button.onclick = null;
    }
};

const handlePreviousNumberPage = () => {
    if (selectedPage > 1) {
        selectedPage = selectedPage - 1;
        sendRequest(selectedPage);
    }
};

const addHandlePreviousTwiceNumberPage = () => {
    const button = document.querySelector('.previousTwice_number');

    button.onclick = handlePreviousTwiceNumberPage;
    button.textContent = (+selectedPage - 2);
    if (selectedPage === 1) {
        button.textContent = '';
        button.onclick = null;
    }
};

const handlePreviousTwiceNumberPage = () => {
    selectedPage = selectedPage - 2;
    sendRequest(selectedPage);
};

const addHandleNextTwiceNumberPage = () => {
    const button = document.querySelector('.nextTwice_number');

    button.onclick = handleNextTwiceNumberPage;
    button.textContent = (+selectedPage + 2);
    if (selectedPage === 68) {
        button.textContent = '';
        button.onclick = null;
    }
};

const handleNextTwiceNumberPage = () => {
    selectedPage += 2;
    sendRequest(selectedPage);
};

const addHandleNextNumberPage = () => {
    const button = document.querySelector('.next_number');

    button.onclick = handleNextNumberPage;
    button.textContent = (+selectedPage + 1);
    if (selectedPage === 68) {
        button.textContent = '';
        button.onclick = null;
    }
};

const handleNextNumberPage = () => {
    selectedPage += 1;
    sendRequest(selectedPage);
};

const addHandleNext = () => {
    const backButt = document.querySelector('.next_film');

    backButt.onclick = nextMovie;
};

const nextMovie = () => {
    selectedMovieId += 1;

    const movie = saveMovieArray[selectedMovieId];

    if (movie) {
        fillIPoster(movie);
        addName(movie);
        addDescription(movie);
    } else {
        changePage();
    }
};

const changePage = () => {
    selectedMovieId = 0;
    selectedPage += 1;
    saveMovieArray = [];
    sendRequest(selectedPage);
};

const addHandleMainPage = () => {
    const mainPage = document.querySelector('.siteName');

    mainPage.onclick = handleMainPage;
};

const handleMainPage = ()=> {
    const contentArea = document.querySelector('.contentBlock');
    const detailsArea = document.querySelector('.details');
    const buttonArea = document.querySelector('.button');

    contentArea.className = 'contentBlock';
    detailsArea.className = 'hidden details';
    buttonArea.className = 'button';
    selectedPage = 1;
    sendRequest(selectedPage);
};

const addHandleBack = () => {
    const backButt = document.querySelector('.back_link');

    backButt.onclick = backToList;
};

const backToList = () => {
    const contentArea = document.querySelector('.contentBlock');
    const detailsArea = document.querySelector('.details');
    const buttonArea = document.querySelector('.button');

    buttonsReload();
    selectedMovieId = null;
    contentArea.className = 'contentBlock';
    detailsArea.className = 'hidden details';
    buttonArea.className = 'button';
};

const openInfo = (movie, id) => {
    const contentArea = document.querySelector('.contentBlock');
    const detailsArea = document.querySelector('.details');
    const buttonArea = document.querySelector('.button');

    selectedMovieId = id;
    contentArea.className = 'hidden contentBlock';
    detailsArea.className = 'details';
    buttonArea.className = 'hidden button';
    fillIPoster(movie);
    addName(movie);
    addDescription(movie);
};

const createImg = (movie) => {
    const poster = document.createElement('img');

    poster.src = `http://image.tmdb.org/t/p/w342${movie.poster_path}`;
    poster.id = movie.id;
    poster.alt = movie.title;

    return poster;
};

const fillIPoster = (movie) => {
    const img = document.querySelector('.poster img');

    img.src = `http://image.tmdb.org/t/p/w342${movie.poster_path}`;
};

const addName = (movie) => {
    const movieName = document.querySelector('.name');

    movieName.textContent = movie.title;
};

const addDescription = (movie) => {
    const movieDesc = document.querySelector('.fullDescription');

    movieDesc.textContent = movie.overview;
};

const drawMovie = (movie, id) => {
    const contentContainer = document.querySelector('.content');
    let singleMovie = document.createElement('div');

    singleMovie.id = id;
    singleMovie.append(createImg(movie));
    contentContainer.append(singleMovie);
    singleMovie.onclick = openInfo.bind(this, movie, id);
};

const drawMovieList = movieList => {
    movieList.forEach(drawMovie);
};

const checkResponse = function (resp) {
    resp.json().then((parsedResp) => {
        saveMovieArray = [...parsedResp.results];
        clearMovieContainer();
        drawMovieList(parsedResp.results);
        if (selectedMovieId === 0) {
            fillIPoster(saveMovieArray[selectedMovieId]);
            addName(saveMovieArray[selectedMovieId]);
            addDescription(saveMovieArray[selectedMovieId]);
        }
    })
};

const sendRequest = () => {
    fetch(getRequestUrl(selectedPage))
        .then(checkResponse);
    buttonsReload();
};

const buttonsReload = () => {
    addHandleFirstPage();
    addHandleNextPage();
    addHandlePreviousPage();
    addHandleLastPage();
    addHandleCurrentPage();
    addHandlePreviousNumberPage();
    addHandleNextNumberPage();
    addHandleNextTwiceNumberPage();
    addHandlePreviousTwiceNumberPage();
};

const init = () => {
    sendRequest();
    addHandleBack();
    addHandleNext();
    buttonsReload();
    addHandleMainPage();
};
init();
