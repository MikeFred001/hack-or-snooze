"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const  $postStoryForm = $('#post-story-form');

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

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

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
 * addStory method, and then puts that new story on the page.
 */

async function addNewStoryToPage() {

  const storyData = {
    author: $("#author").val(),
    title: $("#title").val(),
    url: $("#url").val()
  };

  const newStory = await storyList.addStory(currentUser, storyData);

  let newStoryMarkup = generateStoryMarkup(newStory);
  $allStoriesList.prepend(newStoryMarkup);
}


/** Handles submit for new story form.
 * Populates new story on the page and collapses new story form.
 */
$postStoryForm.on("submit", function(evt) {
  evt.preventDefault();

  addNewStoryToPage();

  $postStoryForm.slideUp();
});


