let cards = JSON.parse(localStorage.getItem('cards') || '[]');

function saveToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function render() {
    ['pendiente','ingresado','en_produccion','publicado'].forEach(status => {
        const column = document.getElementById(status);
        column.innerHTML = '';
        cards.filter(c => c.status === status).forEach(c => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = c.title;
            card.onclick = () => openModal(c.id);
            column.appendChild(card);
        });
    });
}

function addCard(status) {
    const id = Date.now();
    const newCard = { id, title: 'Nuevo proyecto', status, category: '', start: '', end: '', description: '' };
    cards.push(newCard);
    saveToStorage();
    render();
}

function openModal(id) {
    const card = cards.find(c => c.id === id);
    document.getElementById('cardId').value = id;
    document.getElementById('cardStatus').value = card.status;
    document.getElementById('cardTitle').value = card.title;
    document.getElementById('cardCategory').value = card.category;
    document.getElementById('cardStart').value = card.start;
    document.getElementById('cardEnd').value = card.end;
    document.getElementById('cardDescription').innerHTML = card.description;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function saveCard(event) {
    event.preventDefault();
    const id = Number(document.getElementById('cardId').value);
    const card = cards.find(c => c.id === id);
    card.title = document.getElementById('cardTitle').value;
    card.category = document.getElementById('cardCategory').value;
    card.start = document.getElementById('cardStart').value;
    card.end = document.getElementById('cardEnd').value;
    card.description = document.getElementById('cardDescription').innerHTML;
    saveToStorage();
    closeModal();
    render();
}

window.onload = render;
