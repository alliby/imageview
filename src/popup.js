const sizeS = document.getElementById('size-s');
const sizeM = document.getElementById('size-m');
const sizeL = document.getElementById('size-l');

const sizes = {
  S: 200,
  M: 400,
  L: 600,
};

function setActiveButton(selectedSize) {
  [sizeS, sizeM, sizeL].forEach(button => {
    button.classList.remove('active');
  });
  if (selectedSize === sizes.S) {
    sizeS.classList.add('active');
  } else if (selectedSize === sizes.M) {
    sizeM.classList.add('active');
  } else if (selectedSize === sizes.L) {
    sizeL.classList.add('active');
  }
}

chrome.storage.sync.get('previewSize', (data) => {
  const currentSize = data.previewSize || sizes.M; // Default to M if not set
  setActiveButton(currentSize);
});

sizeS.addEventListener('click', () => {
  chrome.storage.sync.set({ previewSize: sizes.S });
  setActiveButton(sizes.S);
});

sizeM.addEventListener('click', () => {
  chrome.storage.sync.set({ previewSize: sizes.M });
  setActiveButton(sizes.M);
});

sizeL.addEventListener('click', () => {
  chrome.storage.sync.set({ previewSize: sizes.L });
  setActiveButton(sizes.L);
});
