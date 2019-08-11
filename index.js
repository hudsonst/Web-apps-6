'use strict';

function displayResults(responseJson, user) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  $('.error-message').empty();
  if ($('.userhead').show()) {
    $('.userhead').empty();  
    }
  if (!$('#results').hasClass('hidden')) {
    $('#results').addClass('hidden');
   };

  // iterate through the repos array
  if (responseJson.length === 0) {
    $('#js-error-message').text(`${user} has no repos`);
    return;
  }
  $('#results-list').append(`<h3 class="userhead">${user}'s Repos</h3>`);
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].html_url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(user) {
  const url = `https://api.github.com/users/${user}/repos`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, user))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);