const notepad = document.getElementById("notepad");
const saveButton = document.getElementById("saveButton");
const noteList = document.getElementById("noteList");

// Carregar notas salvas anteriormente
window.addEventListener("load", () => {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.forEach((note, index) => {
        createNoteElement(note, index);
    });
});

// Salvar nota atual
saveButton.addEventListener("click", () => {
    const content = notepad.value;
    if (content.trim() !== "") {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
        savedNotes.push(content);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        createNoteElement(content, savedNotes.length - 1);
        notepad.value = "";
    }
});

// Criar elemento de nota na lista
function createNoteElement(content, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<button onclick="deleteNote(${index})">Excluir</button> ${content}`;
    noteList.appendChild(listItem);
}

// Excluir uma nota
function deleteNote(index) {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    refreshNoteList();
}

// Atualizar lista de notas
function refreshNoteList() {
    while (noteList.firstChild) {
        noteList.removeChild(noteList.firstChild);
    }

    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.forEach((note, index) => {
        createNoteElement(note, index);
    });
}
