const renderCharacters = async () => {
  const response = await fetch('/characters')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data) {
    data.map(character => {
      const card = document.createElement('div')
      card.classList.add('card')

      const topContainer = document.createElement('div')
      topContainer.classList.add('top-container')

      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('bottom-container')

      topContainer.style.backgroundImage = `url(${character.icon})`

      const name = document.createElement('h3')
      name.textContent = character.name
      bottomContainer.appendChild(name)

      const country = document.createElement('p')
      country.textContent = character.country
      bottomContainer.appendChild(country)

      const link = document.createElement('a')
      link.textContent = 'Read More >'
      link.setAttribute('role', 'button')
      link.href = `/characters/${character.id}`
      bottomContainer.appendChild(link)

      card.appendChild(topContainer)
      card.appendChild(bottomContainer)

      mainContent.appendChild(card)
    })
  }
  else {
    const message = document.createElement('h2')
    message.textContent = 'No Characters Available 😞'
    mainContent.appendChild(message)
  }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '../404.html'
}
else {
  renderCharacters()
}
