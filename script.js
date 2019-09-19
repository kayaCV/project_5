let people = [];
//CH,DE,DK,ES,FI,FR,NO,NZ,TR,BR,NL,CA ---- non english chracters
fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=AU,GB,IE,US') 
  .then(response => response.json())
  .then(data => data.results.map(result => {
    people.push(result);
    generateHTML(result); 
    })// end map()
  ) // end fetch;

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
  let dob = item.dob.date.slice(0, 10);
  const regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  const replacement = '$2/$3/$1';
  return dob.replace(regex, replacement);
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

//

// Populate modal window with HTML
function populatePopUp(item) {
  $(".modal-img").attr('src', `${getImage(item)}`);
  $('.modal-info-container #name').text(`${getName(item)}`);
  $( ".modal-info-container p:eq( 0 )").text(`${getEmail(item)}`);
  $( ".modal-info-container p:eq( 1 )").text(`${getCity(item)}`);
  $( ".modal-info-container p:eq( 2 )").text(`${getPhoneNumber(item)}`);
  $( ".modal-info-container p:eq( 3 )").text(`${getStreetAddress(item)}, ${getCity(item)}, ${getState(item)} ${getZip(item)}`);
  $( ".modal-info-container p:eq( 3 )").css("text-transform", "capitalize");
  $(".modal-info-container p:eq( 4 )").text(`Birthday: ${getBirthday(item)}`); 
  $('.modal-container').show();
} // end populatePopUp()

function checkSource(event) {
  if(event.className === 'card-img') {
    let emailForPicture = event.parentNode.nextElementSibling.children[1].innerText;
    return emailForPicture;
  } 
  if(event.className === 'card-text') {
    return event.innerText; //compare to people.email
  }
  if(event.className === 'card-text cap') {
    return event.previousElementSibling.innerText; //innerText.toLowerCase(); //compare to people.location.city
  }
  if(event.id === 'name') {
    let firstName = event.innerText.split(/(\s+)/);
    return firstName[0].toLowerCase();  // compare to people.name.first
  }
}   // end checkSource()

// end FUNCTIONS


// Search markup from template: create and append search input and submit button to form
const form = $(`<form action="#" method="get">      
                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
              </form>`); // end form

$('.search-container').html(form);  // append search tools to form



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

$('#gallery').after(modalContainer);    // append modal window to body

modalContainer.hide();

// LISTENERS

let indexNumber;
$('#gallery').click((e) => {
  let source = checkSource(e.target);
  // $('.card').eq(11).hide();
  people.forEach( person => {
   if(source === person.name.first || source === person.email) {
      if(source === person.email) {
        indexNumber = people.indexOf(person);
      }  else if(source === person.picture.large) {

      }  else if(source === person.name.first) {
        indexNumber =  people.indexOf(person);
      } 
     populatePopUp(people[indexNumber]);
    }
    
  });
}); // end #gallery event listener

// pop up window closes
modalContainer.click((e) => {
  if(e.target.innerText === "X" || e.target.className === "modal-container") {
  modalContainer.hide();
  }
});

// END LISTENERS



//  SEARCH!!!!! YAYAYAYAYAYAYYYYY!!!
$('form').submit( () => {
  let searchTerm = $('#search-input').val().toLowerCase();
  let cards = $('.card');
  people.forEach(person => {
    let index = (people.indexOf(person));
    cards.eq(index).show();
    if(person.name.first.indexOf(searchTerm) === -1) { 
      cards.eq(index).hide();
    }
    if(searchTerm.length === 0) {
      cards.show();
    }
  });
})

//sname.indexOf(searchTerm) > -1