const previewDiv = document.createElement('div');
previewDiv.id = 'image-preview';
document.body.appendChild(previewDiv);

let previewSize = 300;

chrome.storage.sync.get('previewSize', (data) => {
  if (data.previewSize) {
    previewSize = data.previewSize;
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.previewSize) {
    previewSize = changes.previewSize.newValue;
  }
});

const images = document.getElementsByTagName('img');

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('mouseover', (e) => {
    const img = document.createElement('img');
    img.src = e.target.src;

    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      previewDiv.style.width = `${previewSize}px`;
      previewDiv.style.height = `${previewSize / aspectRatio}px`;
    };

    previewDiv.innerHTML = '';
    previewDiv.appendChild(img);

    previewDiv.style.display = 'block';
  });

  images[i].addEventListener('mouseout', () => {
    previewDiv.style.display = 'none';
  });

  images[i].addEventListener('mousemove', (e) => {
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    const previewRect = previewDiv.getBoundingClientRect();

    if (x + previewRect.width > window.innerWidth) {
      x = e.clientX - previewRect.width - 15;
    }

    if (y + previewRect.height > window.innerHeight) {
      y = e.clientY - previewRect.height - 15;
    }

    previewDiv.style.top = `${y}px`;
    previewDiv.style.left = `${x}px`;
  });
}
