"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
  $postStoryForm.hide();
  $favoritedStories.hide();
}

$body.on("click", "#nav-all", navAllStories);

function showFavoritesOnPage() {
  console.debug("showFavoritesOnPage", showFavoritesOnPage);
  $favoritedStories.empty();

  // loop through all of our stories and generate HTML for them
  for (let favoriteStory of currentUser.favorites) {
    const $favoriteStoriesMarkup = generateStoryMarkup(favoriteStory);
    $favoritedStories.append($favoriteStoriesMarkup);
  }

  $allStoriesList.hide();
  $favoritedStories.show();
}

$body.on("click", "#nav-favorites", showFavoritesOnPage);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navLeft.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Displays form to add a new story when 'submit' button is clicked. */
function displayAddStoryForm() {
  $postStoryForm.show();
}

/** Click handler for displaying an add-story form */
$navSubmit.on("click", displayAddStoryForm);
