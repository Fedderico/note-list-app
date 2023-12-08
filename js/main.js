const form = document.getElementById("noteForm");
const titleInput = document.getElementById("noteTitle");
const textInput = document.getElementById("noteText");
const list = document.getElementById("noteList");
const searchInput = document.querySelector("#buscarInput");

//guarda en el local storage
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// actualiza las notas guardadas en el localStorage
renderNotes();

// envia el formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Guarda nueva nota
  const note = { title: titleInput.value, text: textInput.value };
  notes.push(note);
  saveNotesInLocalStorage();

  // reset de campos
  titleInput.value = "";
  textInput.value = "";

  // Renderizar notas
  renderNotes();
});

function renderNotes() {
  list.innerHTML = "";
  notes.forEach(function (note, index) {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
            <div class="flex items-center mb-3">
                <p class="mr-2">${note.title}</p>
                <button class="deleteNoteButton py-1 px-2 bg-red-600 text-white rounded-md">X</button>
            </div>
            <p class="border p-2 rounded-md mb-2">${note.text}</p>
        `;

    // eliminar una nota
    listItem
      .querySelector(".deleteNoteButton")
      .addEventListener("click", function () {
        notes.splice(index, 1);
        saveNotesInLocalStorage();
        renderNotes();
      });

    list.appendChild(listItem);
  });
}

// guardar en localStorage
function saveNotesInLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// búsqueda
document.querySelector(".boton").addEventListener("click", function () {
  const searchText = searchInput.value.toLowerCase();
  const foundNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText) ||
      note.text.toLowerCase().includes(searchText)
  );
  // Mostrar las notas en el modal
  if (foundNotes.length > 0) {
    const modalContent = document.createElement("div");
    modalContent.classList.add(
      "bg-white",
      "p-8",
      "rounded",
      "shadow-lg",
      "center"
    );

    foundNotes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.innerHTML = `
                <h2 class="text-xl font-bold mb-2">${note.title}</h2>
                <p class="border p-2 rounded-md mb-2">${note.text}</p>
            `;
      modalContent.appendChild(noteElement);
    });

    showModal(modalContent);
  } else {
    alert("Nota no encontrada");
  }
});

// Modal
function showModal(content) {
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-50",
    "z-50",
    "flex",
    "items-center",
    "justify-center"
  );
  modal.appendChild(content);

  document.body.appendChild(modal);

  // cerrar modal
  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Cerrar";
  closeModalBtn.classList.add(
    "mt-4",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
    "focus:outline-none",
    "focus:shadow-outline",
    "boton"
  );
  closeModalBtn.addEventListener("click", function () {
    document.body.removeChild(modal);
  });

  modal.appendChild(closeModalBtn);
}
