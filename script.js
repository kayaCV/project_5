// Global variables
let people = [];
let results = people; // temp
let startIndex = 0; // temp

// Fetch select information from randomuser.me
fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=AU,GB,IE,US') 
  .then(status)  
  .then(response => response.json())
  .then(data => data.results.map(result => {
    people.push(result);
    generateHTML(result);
  }))
  .catch(err => console.log(`There's been a problem:`, err)); // end fetch;

// Check and return response status of request  
function status (response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject (new Error(response.statusText));
  }
}
console.log(people);

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

// Search markup from template: create and append search input and submit button to form
const form = $(`<form action="#" method="get">      
                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                </form>`); // end form

$('.search-container').html(form);  // append search tools to form

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
  return item.cell;
}
function getStreetAddress(item) {
  return [item.location.street.number, item.location.street.name].join(' ');
}
function getState(item) {
  return item.location.state;
}
function getZip(item) {
  return item.location.postcode;
}
function getBirthday(item) {
  let dob = item.dob.date.slice(0, 10);
  const regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  const replacement = '$2/$3/$1';
  return dob.replace(regex, replacement);
}

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
                              <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                              </div>
                            </div>`); // end modalContainer

$('#gallery').after(modalContainer);    // append modal window to body

modalContainer.hide();   // hides the modal container (pop up window)

function checkSource(event) { // finds the target of event and returns email
    if(event.id !== 'gallery') {
      if(event.parentNode.className === 'card') {
        return event.parentNode.children[1].children[1].innerText;  
      }
      if(event.parentNode.parentNode.className === 'card') {
        return event.parentNode.parentNode.children[1].children[1].innerText;
      }
      if(event.className === 'card') {
        return event.children[1].children[1].innerText;
      }  
    }
  }   // end checkSource()
 

$('#gallery').click((e) => { // opens a pop up window when .card is clicked 
  let clickedSource = checkSource(e.target);

  endIndex = results.length - 1;
    
  results.forEach( person => {
   openPopUp(person, clickedSource);  
  });  
}); // end #gallery event listener
  
// pop up window closes
modalContainer.click((e) => {
  if(e.target.innerText === "X" || e.target.className === "modal-container") {
    modalContainer.hide();
  }
}); // end modalContainer listener

function populatePopUp(item) {  // populates pop up window with info from clicked card
  if(indexNumber === startIndex) {
    $("#modal-prev").hide();
  } 
  if(indexNumber === endIndex) {
    $("#modal-next").hide();
  }
  $(".modal-img").attr('src', `${getImage(item)}`);
  $('.modal-info-container #name').text(`${getName(item)}`);
  $(".modal-info-container p:eq( 0 )").text(`${getEmail(item)}`);
  $(".modal-info-container p:eq( 1 )").text(`${getCity(item)}`);
  $(".modal-info-container p:eq( 2 )").text(`${getPhoneNumber(item)}`);
  $(".modal-info-container p:eq( 3 )").text(`${getStreetAddress(item)}, ${getCity(item)}, ${getState(item)}, ${getZip(item)}`);
  $(".modal-info-container p:eq( 3 )").css("text-transform", "capitalize");
  $(".modal-info-container p:eq( 4 )").text(`Birthday: ${getBirthday(item)}`); 
  $('.modal-container').show();
} // end populatePopUp()

let indexNumber;

function openPopUp(person, source) {  // calls populatePopUp to populate and show pop up window
  if(source === person.email) {
    $("#modal-prev").show();
    $("#modal-next").show();
    indexNumber = results.indexOf(person);
    populatePopUp(results[indexNumber]);
  }
}

//                TRYYYYYYYYY
let searchResults = [];

// create, append and hide "No results" message
let noResultsMessage = $(`<h3 id="no-results">Sorry, no results</h3>`)
noResultsMessage.hide();
$('#gallery').append(noResultsMessage);

// searches for user input text in array of objects and displays respective cards
$('form').on('keyup', () => { 
  searchResults = [];
  let searchTerm = $('#search-input').val().toLowerCase();
  let cards = $('.card');
  cards.remove();
  noResultsMessage.hide();
  $('.modal-btn-container').show();
  
  people.forEach(person => { 
    let personName = getName(person).toLowerCase();
    if(personName.indexOf(searchTerm) >= 0) {
      generateHTML(person);
      searchResults.push(person);
    }
  });
  results = searchResults;
  if(!results.length) {
    noResultsMessage.show();
  }
  if(results.length === 1) {
     $('.modal-btn-container').hide();
  }
})  // end form listener (search)

// shows next person's information when 'next' is clicked
$("#modal-next").on('click', (e) => {
  $("#modal-prev").show();
  indexNumber++;
  populatePopUp(results[indexNumber]);
});

// shows previous person's information when 'prev' is clicked
$("#modal-prev").on('click', (e) => {
  $("#modal-next").show();
  indexNumber--;
  populatePopUp(results[indexNumber]);
});
//      END TRYYYYYYYY