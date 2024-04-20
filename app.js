const notes = [];

// const form = document.querySelector("form") as HTMLFormElement;
// const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
// const ul = document.querySelector("#notes") as HTMLUListElement;

// const btnLearn = document.querySelector("#btnLearn") as HTMLButtonElement;

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes.push(...JSON.parse(savedNotes));
  }
  renderNotes();

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("textarea").value;
    if (note.length == 0) {
      alert("You didn't input any content");
    } else {
      notes.push(note);
      renderNotes();
      saveNotes();
      document.querySelector("textarea").value = "";
    }
  });

  document.querySelector("#btnLearn").addEventListener("click", () => {
    location.href = "https://frontendmasters.com";
  });

  let bipEvent = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    bipEvent = event;
  });

  document.querySelector("#btnInstall").addEventListener("click", () => {
    if (bipEvent) {
      bipEvent.prompt();
    } else {
      alert("to install the app, you need to use the browser menu.");
    }
  });

  document.querySelector("#btnShare").addEventListener("click", () => {
    let shareNotes = "";

    navigator.share({
      title: "Codepad Notes",
      text: shareNotes,
    });
  });
});

// Render the notes on the DOM
function renderNotes() {
  const ul = document.querySelector("#notes");

  if (!ul) return;

  ul.innerHTML = "";
  notes.forEach((note, index) => {
    // Create the note LI
    const li = document.createElement("li");
    li.innerHTML = note;
    // Delete element for each note
    const deleteButton = document.createElement("a");
    deleteButton.innerHTML = '<button class="icon">delete</button>';
    deleteButton.addEventListener("click", () => {
      if (confirm("Do you want to delete this note?")) {
        notes.splice(index, 1);
        renderNotes();
        saveNotes();
      }
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
