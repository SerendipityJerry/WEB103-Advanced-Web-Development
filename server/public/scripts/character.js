const renderCharacter = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())

  const response = await fetch('/characters')
  const data = await response.json()

  const characterContent = document.getElementById('character-content')

  let character

  character = data.find(character => character.id === requestedID)

  if (character) {
    document.getElementById('image').src = character.image
    document.getElementById('name').textContent = character.name
    document.getElementById('country').textContent = 'Country: ' + character.country
    document.getElementById('description').textContent = character.description
    document.title = `Genshin Impact - ${character.name}`
  }
  else {
    const message = document.createElement('h2')
    message.textContent = 'No characters Available 😞'
    characterContent.appendChild(message)   
  }
}

renderCharacter()
