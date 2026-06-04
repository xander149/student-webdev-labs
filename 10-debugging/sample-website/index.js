const moreInfoButtons = document.querySelectorAll('.more-info-button');

for (const moreInfoButton of moreInfoButtons) {
  moreInfoButton.addEventListener('click', (event) => {
    const popupSection = event.currentTarget.parentElement.nextElementSibling;
    popupSection.style.display = 'block';
  });
}

const closePopupButtons = document.querySelectorAll('.close-popup-button');

for (const closePopupButton of closePopupButtons) {
  closePopupButton.addEventListener('click', (event) => {
    console.log(event.target);
    const popupSection =
      event.currentTarget.parentElement.parentElement.parentElement;
    popupSection.style.display = 'none';
  });
}

const createLoadingContainer = function () {
  const loadingContainer = document.getElementById("cat-facts-loading-container")
  const loader = document.createElement('img');
  loader.src = '../../images/loader.gif';
  loader.alt = 'loader gif while the data loads';
  loader.width = 60;
  loader.height = 60;
  if (loadingContainer == null)
  {
    console.error("Could not find any loading containers")
  }
  else 
  {
    loadingContainer.append(loader);
    loadingContainer.classList.remove('display-none');
  }
};

const fetchCatFacts = async function () {
  const catFactsList = document.getElementById('cat-facts-list');
  catFactsList.replaceChildren();

  createLoadingContainer();

  try {

    //Instead of just getting the first 10 facts, get 10 random ones using the
    //endpoint for a single fact.
    const promises = Array.from({ length: 10 }, () => 
      fetch('https://catfact.ninja/fact').then(res => res.json())
    );
  
    const combinedData = await Promise.all(promises);

    combinedData.forEach((element) => {
      const catFactItem = document.createElement('p');
      catFactItem.setAttribute('class', 'cat-fact-list-item');
      catFactItem.textContent = element.fact;
      catFactsList.append(catFactItem);
    });
  } catch (error) {
    console.error('Error fetching cat facts:', error);
  } finally {
    const loading = document.getElementById('cat-facts-loading-container');
    loading.setAttribute('class', 'display-none');
    loading.replaceChildren();
  }
};

fetchCatFacts();

document
  .querySelector('.reload-cat-facts')
  .addEventListener('click', fetchCatFacts);
