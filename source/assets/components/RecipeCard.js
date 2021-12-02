class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    const styleElem = document.createElement('style');
    const styles = `
            * {
                font-family: 'Inter', sans-serif;
                margin: 0;
            }

            img {
              height: 120px;
              width: 100%;
              object-fit: cover;
            }

            article {
                width: 160px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                background-color: #fff;
                overflow-x: hidden;
                border-radius: 8px;
                position: relative;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.10);
            }

            article > span {
                color: #fff;
                padding: 3px 9px;
                border-radius: 50%;
                font-weight: 500;
                font-size: 18px;
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .level-1 {
                background-color: #5EAF70;
            }

            .level-2 {
                background-color: #F4BA26;
            }

            .level-3 {
                background-color: #EC8A53;
            }


            .level-4 {
                background-color: #EC5353;
            }

            .wrapper > p {
                font-style: italic;
                font-size: 18px;
                font-weight: 300;
                padding: 6px 0;
            }

            .wrapper {
                padding: 12px 12px;
            }

            .tags__wrapper > span {
                font-size: 9px;
                font-weight: 500;
                color: #EC8A53;
                background-color: #FFEBE0;
                padding: 3px 5px;
                margin: 0 4px 4px 0;
                border-radius: 6px;
                border: 1px solid #EC8A53
            }

            .tags__wrapper {
                display: flex;
                flex-wrap: wrap;
            }

            time {
                font-size: 14px;
                color: #999;
            }

            .hash {
              display: none;
            }
        `;
    styleElem.innerHTML = styles;


    this.json = data;

    const hash = document.createElement('span');
    hash.classList.add('hash');
    hash.textContent = data.hash;
    const card = document.createElement('article');

    const image = document.createElement('img');
    image.src = data.thumbnail;
    image.alt = data.name;

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const title = document.createElement('p');
    const titleLink = document.createElement('a');
    titleLink.textContent = data.name;

    title.appendChild(titleLink);

    const tagWrapper = document.createElement('div');
    tagWrapper.classList.add('tags__wrapper');
        
        
    const tags = data.intolerances || [];
    tags.forEach((tagName) => {
      const tag = document.createElement('span');
      tag.textContent = tagName;
      tagWrapper.appendChild(tag);
    });

    const level = document.createElement('span');
    const setLevel = data.difficulty;
    let numLevel;

    if (setLevel > 0.75) 
      numLevel = 4;
    else if (setLevel > 0.50) 
      numLevel = 3;
    else if (setLevel > 0.25) 
      numLevel = 2;
    else 
      numLevel = 1;
    
    level.textContent = numLevel;
    level.classList.add(`level-${numLevel}`);


    const duration = document.createElement('time');
    duration.textContent = `${data.readyInMinutes} MIN`;

    wrapper.appendChild(title);
    wrapper.appendChild(tagWrapper);
    wrapper.appendChild(duration);


    card.appendChild(image);
    card.appendChild(level);
    card.appendChild(wrapper);
    card.appendChild(hash);
        
    
    this.shadowRoot.append(styleElem, card);
  }

  get data() {
    return this.json;
  }
}

customElements.define('recipe-card', RecipeCard);
