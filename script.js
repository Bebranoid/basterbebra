let isDrawing = false;
let isEditMode = false;

function previewImage(event) {
  const input = event.target;
  const previewContainer = document.getElementById('previewContainer');
  const previewImage = document.getElementById('previewImage');
  const circleButton = document.getElementById('circleButton');

  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      previewImage.src = e.target.result;
      previewContainer.classList.remove('hidden');
      circleButton.classList.remove('hidden');
    };

    reader.readAsDataURL(file);
  }
}

function drawCircle() {
  isDrawing = !isDrawing;

  if (isDrawing) {
    document.addEventListener('click', placeCircle);
  } else {
    document.removeEventListener('click', placeCircle);
  }
}

function placeCircle(event) {
  if (!isDrawing) {
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  const previewImage = document.getElementById('previewImage');
  const imageRect = previewImage.getBoundingClientRect();

  if (
    x >= imageRect.left &&
    x <= imageRect.right &&
    y >= imageRect.top &&
    y <= imageRect.bottom
  ) {
    const circle = document.createElement('div');
    circle.classList.add('drawing-circle');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circle.addEventListener('click', () => {
      openPopup();
    });

    document.body.appendChild(circle);
  }
}

function openPopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('hidden');
  resetEditMode();
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('hidden');
  resetEditMode();
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  const editableText = document.getElementById('editableText');
  const editButton = document.getElementById('editButton');

  editableText.contentEditable = isEditMode;
  editButton.textContent = isEditMode ? 'Сохранить' : 'Редактировать';
}

function resetEditMode() {
  isEditMode = false;
  const editableText = document.getElementById('editableText');
  const editButton = document.getElementById('editButton');

  editableText.contentEditable = false;
  editButton.textContent = 'Редактировать';
}
