let people = [];
//CH,DE,DK,ES,FI,FR,NO,NZ,TR,BR,NL,CA ---- non english chracters
fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=AU,GB,IE,US') 
  .then(response => response.json())
  .then(data => data.results.map(result => {
    people.push(result);
    generateHTML(result);
    })// end map()
  ); // end fetch
console.log(people);


  

// FUNCTIONS:
function getImage(item) {
  return item.picture.large;
}
function getName(item) {
  return [item.name.first, item.name.last].join(' ');
}
function getEmail(item) {
  return item.email;
}
function getCity(item) {
  return item.location.city;
}
function getPhoneNumber(item) {
  return item.phone;
}
function getStreetAddress(item) {
  return item.location.street;
}
function getState(item) {
  return item.location.state;
}
function getZip(item) {
  return item.location.postcode;
}
function getBirthday(item) {
return item.dob.date;
}

// Gallery markup from template: create and append gallery items; get and display random users
function generateHTML(result) {
  const cardDiv = $(`<div class="card"> 
                        <div class="card-img-container">
                          <img class="card-img" src="${getImage(result)}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${getName(result)}</h3>
                          <p class="card-text">${getEmail(result)}</p>
                          <p class="card-text cap">${getCity(result)}</p>
                        </div>
                      </div>`); 
  $('#gallery').append(cardDiv);
} // end generateHTML

// Populate modal window with HTML
function populatePopUp(item) {
  $(".modal-img").attr('src', `${getImage(item)}`);
  $('.modal-info-container #name').text(`${getName(item)}`);
  $( ".modal-info-container p:eq( 0 )").text(`${getEmail(item)}`);
  $( ".modal-info-container p:eq( 1 )").text(`${getCity(item)}`);
  $( ".modal-info-container p:eq( 2 )").text(`${getPhoneNumber(item)}`);
  $( ".modal-info-container p:eq( 3 )").text(`${getStreetAddress(item)}, ${getCity(item)}, ${getState(item)} ${getZip(item)}`);
  $(".modal-info-container p:eq( 4 )").text(`Birthday: ${getBirthday(item)}`); 
} // end populatePopUp()

// end FUNCTIONS


// Search markup from template: create and append search input and submit button to form
const form = $(`<form action="#" method="get">      
                  <input type="search" id="search-input class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
              </form>`); // end form

$('.search-container').html(form);  // append search tools to form



// Modal markup from template: create and append modal window elements to body
//function populatePopUp(item) {
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
//} // end populatePopUp()

//$('body').append(modalContainer);  // append modal window to body

$('#gallery').after(modalContainer);    // append modal window to body

modalContainer.hide();



// LISTENERS
// pop up window pops up
$('#gallery').click((e) => {
  if(e.target.className !== 'gallery') { // || e.target.parentNode.className  === 'card'
    populatePopUp(people[0]);
   // console.log($('#gallery').index(e.target.name));
    console.log(e.currentTarget.children);
    //alert( $('#gallery').index(this) );
    modalContainer.show();
  }
});
/**
 * $('selector').click(function(){
    alert( $('selector').index(this) );
});
 */
// pop up window closes
modalContainer.click((e) => {
  if(e.target.innerText === "X" || e.target.className === "modal-container") {
  modalContainer.hide();
  }
});

// END LISTENERS

// const index = fruits.findIndex(fruit => fruit === "blueberries");

