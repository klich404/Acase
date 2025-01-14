class trashCards {
  getElementsToTrash() {
    (async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/card/');
        let entireList = response.data; // All objects 10 []
        let responseList = []
        entireList.forEach(e => {
          if (e.My_selection == false && e.Trash_section == true)
          responseList.push(e)
        })
        let cards = this.makeCards(responseList);
        document.getElementById('cards-container').innerHTML = cards;
        this.getAndShowModifiedData(responseList);
      } catch (error) {
        console.log(error);
      }
    })();
  }
// Function to make the html card
  makeCards(cards) {
    let htmlElements = ``
    cards.forEach(element => {
      htmlElements += `<div id="${element.id}" class="col">
      <div class="card mb-2">
      <div class="card-body">
      <div>
      <h3 class="card-title mb-3">${this.truncateTitle(element.Title)}</h3>
      <p class="card-text mb-2"> ${this.truncateText(element.Text)}</p>
      </div>
      <div>
      <p class="date mb-1"><b>Fecha: </b>${element.Date}</p>
      <p class="source-url"><b>Fuente:</b> ${this.truncateUrl(element.Url)}/</p>
      <a href="${element.Url}" target="_blank" class="btn btn-primary">Visitar</a>
      <a data-id="${element.id}" href="#" class="modify-button btn btn-primary">Visualizar</a>
      </div>
      </div>
      </div>
      </div>`
    });
    return htmlElements
  }

// Truncate Title with 90 words
  truncateTitle(text, limit = 90) {
    return (text.length <= limit)
      ? text
      : text.slice(0, limit) + "..."
  }
// Truncate the text with 180 words 
  truncateText(text, limit = 180) {
    return (text.length <= limit)
      ? text
      : text.slice(0, limit) + "..."
  }
// Truncate the text with 90 words
  truncateUrl(text, limit = 90) {
    return (text.length <= limit)
      ? text
      : text.slice(0, limit) + "..."
  }

// Return the object selected by user
  getAndShowModifiedData(data) {
    document.querySelectorAll('.modify-button').forEach((e, i) => {
      e.addEventListener('click', () => {
        let form = this.showPromptOverlay(data[i]);
        this.renderModifiedData(form);
        this.closeForm();
      })
    })
  }
// Render the data sent by the function getAndShowModifiedData
  renderModifiedData(form) {
    let body = document.querySelector('body');
    let parentElement = document.createElement('div');
    parentElement.setAttribute('id', 'div-form');
    parentElement.innerHTML = form;
    body.appendChild(parentElement);
  }
  // Create the html to view the data selection
  showPromptOverlay(data) {
    return `<div class="container-fluid prompt-overlay">
      <div class="prompt">
      <h2 class="title-text-form">${data.Title}</h2>
      <div>
        <h4 class="subtitle-visualization">¿Por qué es relevante este artículo?</h4>
        <textarea name="" id="input-field" cols="60"
          rows="3">${data.Relevance}</textarea>
      </div>
      <div>
        <h4 class="subtitle-visualization">¿Qué aprendiste de este artículo?</h4>
        <textarea name="" id="input-field" cols="60"
          rows="3">${data.Finding}</textarea>
      </div>
      <div>
        <h4 class="subtitle-visualization">¿Cuál es el hallazgo más importa que encontraste?</h4>
        <textarea name="" id="input-field" cols="60"
          rows="3">${data.Learning}</textarea>
      </div>
      <div>
        <h4 class="subtitle-visualization">Página de inicio y final</h4>
        <textarea name="" id="input-field" cols="60"
          rows="3">${data.Pages}</textarea>
      </div>
      <button class="close-button-visualization">Cerrar</button>
    </div>
  </div>
     `
  }
  // Function to close the form after click Cerrar
  closeForm() {
    document.querySelectorAll('.close-button-visualization').forEach(e => {
      e.addEventListener('click', () => {
        console.log('click')
        document.getElementById('div-form').remove();
      })
    });
  }
}

export { trashCards }
