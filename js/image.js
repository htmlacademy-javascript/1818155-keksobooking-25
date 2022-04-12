const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PREVIEW_SIZE = 70;

const adFormElement = document.querySelector('.ad-form');
const avatarInputElement = adFormElement.querySelector('#avatar');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview');
const photoInputElement = adFormElement.querySelector('#images');
const photoPreviewElement = adFormElement.querySelector('.ad-form__photo');

const defaultAvatarPreviewPadding = avatarInputElement.style.padding;
const defaultAvatarPreviewInnerHTML = avatarPreviewElement.innerHTML;

const createImgElement = (src, isAvatar) => {
  const result = document.createElement('img');
  result.src = src;
  result.alt = isAvatar ? 'Аватар пользователя' : 'Фотография жилья';
  result.width = PREVIEW_SIZE;
  result.height = PREVIEW_SIZE;
  result.style.objectFit = 'contain';

  return result;
};

const setImagePreview = (fileInputElement, previewElement) => {
  fileInputElement.addEventListener('change', () => {
    const file = fileInputElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewElement.innerHTML = '';
      previewElement.style.padding = 0;
      const preview = createImgElement(URL.createObjectURL(file), fileInputElement === avatarInputElement);
      previewElement.append(preview);
    }
  });
};

const resetPreviews = () => {
  avatarPreviewElement.style.padding = defaultAvatarPreviewPadding;
  avatarPreviewElement.innerHTML = defaultAvatarPreviewInnerHTML;
  photoPreviewElement.innerHTML = '';
};

setImagePreview(avatarInputElement, avatarPreviewElement);
setImagePreview(photoInputElement, photoPreviewElement);

export {resetPreviews};
