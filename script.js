
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => data.results.map(result => {

    let fullName = getName(result);
    let img = getImage(result);
    let email = getEmail(result);
    let location = getLocation(result);
    
    generateHTML(img, fullName, email, location);

    })// end map()
  ); // end fetch

// functions:
function getImage(item) {
  return item.picture.medium;
}
function getName(item) {
  return [item.name.first, item.name.last].join(' ');
}
function getEmail(item) {
  return item.email;
}
function getLocation(item) {
  return [item.location.city, item.location.state].join(', ');
}

// Gallery markup from template: create and append gallery items; get and display random users
function generateHTML(image, fullname, email, location) {
  const cardDiv = $(`<div class="card"> 
                        <div class="card-img-container">
                          <img class="card-img" src="${image}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${fullname}</h3>
                          <p class="card-text">${email}</p>
                          <p class="card-text cap">${location}</p>
                        </div>`); 
  $('#gallery').append(cardDiv); 
} // end generateHTML

// end functions


// Search markup from template: create and append search input and submit button to form
const form = $(`<form action="#" method="get">      
                  <input type="search" id="search-input class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
              </form>`); // end form

$('.search-container').html(form);  // append search tools to form



    //PUT BACK
// Modal markup from template: create and append modal window elements to body
const modalContainer = $(`<div class="modal-container">
                            <div class="modal">
                              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                              <div class="modal-info-container">
                                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                                <h3 id="name" class="modal-name cap">name</h3>
                                <p class="modal-text">email</p>
                                <p class="modal-text cap">city</p>
                                <hr>
                                <p class="modal-text">(555) 555-5555</p>
                                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                                <p class="modal-text">Birthday: 10/21/2015</p>
                              </div>
                            </div>
                          </div>`); // end modalContainer

$('body').html(modalContainer);  // append modal window to body

 //     PUT BACK
