"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let iconClass = "far fa-star";

  if (story.isFavorited) {
    iconClass = "fas fa-star";
  }

  const hostName = story.getHostName();
  return $(`
      <li class="storyEntry" id="${story.storyId}">
        <span class="star"><i class="${iconClass}"></i></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/* <i class="bi bi-star-fill"></i>
<i class="bi bi-star"></i> */

// Change from FA to bootstrap later


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** Gets the data from the form, calls the
 * addStory method to add story to api, and then puts that new story on the page.
 */

async function addNewStoryToPage(evt) {
  evt.preventDefault();

  const storyData = {
    author: $("#author").val(),
    title: $("#title").val(),
    url: $("#url").val()
  };

  const newStory = await storyList.addStory(currentUser, storyData);

  let $newStoryMarkup = generateStoryMarkup(newStory);
  $allStoriesList.prepend($newStoryMarkup);

  $postStoryForm.slideUp();
}


/** Handles submit for new story form.
 * Populates new story on the page and collapses new story form.
 */
$postStoryForm.on("submit", addNewStoryToPage);

$('.stories-container').on("click", ".fa-star", async function(evt){
  $(evt.target).toggleClass('far').toggleClass('fas');

  const targetFavoriteStory = addFavoriteToPage(evt);
  await currentUser.addFavorite(targetFavoriteStory);
})

function addFavoriteToPage(evt) {
  const id = $(evt.target).closest(".storyEntry").attr("id");
  console.log("id", id);

  for(let story of storyList.stories) {
    if (story.storyId === id) {
      story.isFavorited = true;
      return story;
    }
  }
}