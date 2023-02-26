const loadPhones = async (inputValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // show more button handle
    const showMore = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showMore.classList.remove('d-none');
    }
    else {
        showMore.classList.add('d-none');
    }
    // display only 10phones
    // phones = phones.slice(0, 10);
    // no phone found case
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-5">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body p-">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show details</button>
                    </div>
                  </div>
        `
        phonesContainer.appendChild(div);
    });
    // stop loader aikahne krte hbe
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const inputValue = document.getElementById('search-field').value;
    loadPhones(inputValue, dataLimit);
}
// search button clicked
document.getElementById('search-btn').addEventListener('click', function () {
    // start loader aikahne krte hbe
    processSearch(10);

})
// search input field inter key handler
document.getElementById('search-field').addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        processSearch(10);
    }
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})
const loadPhoneDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    showPhoneDetails(data.data);
}
const showPhoneDetails=phone=>{
    console.log(phone);
    const modalTitle=document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText=phone.name;
    const releaseDateDetails=document.getElementById('modal-release-body');
    // releaseDateDetails.innerText=phone.releaseDate;
    releaseDateDetails.innerText=phone.mainFeatures.displaySize;
}


// loadPhones();