# FSJS Project 5 - Public API Requests

## Description:
Using the Random User Generator API (https://randomuser.me/), the code requests specific information from API: It gets information for 12 random people including name, pictures and address (amongst others), to be displayed on the page.(lines 7 to 14) 
When an employee card is clicked, a pop up window opens up displaying more details about the employee (like phone number and date of birth). (lines 120 to 128)
Employee cards and pop up windows were created and appended dynamically, using examples provided in the html file and the mockups. (lines 27 to 39 and 81 to 99)



## Extra xredit features:

The following changes have been made to the styles.css file:
    • font-size (line 34)
    • text-shadow(line 35)
    • color (line 37)
    • background (lines 20, 95, 149,198, 259)
    • text-align (line 238)
    • padding (line 93)

An input box and submit button have been dynamically created (using the markup as example) and appended to the '.search-container' div. A keyup event listener searches through results already on the page (by name) and displays matching employees to screen, without sending a new request to the API. (lines 42 to 47 and 175 to 197)

Using the example provided in the index.html file, "Next" and "Prev" buttons were dinamically created and appended to the '.modal-container' div. They allow the user to go back and forth from one emloyee to another. (lines 94 to 98 and 200 to 211)