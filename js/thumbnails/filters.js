const EFFECTS = {
  chrome:  {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  sepia:  {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  marvin:  {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
  },
  phobos:  {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
  },
  heat:  {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: '',
  },
  default: {
    style: 'none',
    min: 1,
    max: 1,
    step: 1,
    units: '',
  },
};

const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');

let currentStyle;
let currentUnit;

const setContainerState = (value) => {
  if (value === 'none') {
    imageUploadEffectLevel.classList.add('hidden');
    imageUploadPreview.style.filter = 'none';
    return;
  }
  imageUploadEffectLevel.classList.remove('hidden');
};

const initEffects = (value) => {
  const {min, max, step, style, units} = EFFECTS[value] || EFFECTS.default;
  currentStyle = style;
  currentUnit = units;

  setContainerState(value);

  noUiSlider.create(effectLevelSlider, {
    range: {
      min,
      max,
    },
    step,
    start: max,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const saturation = effectLevelSlider.noUiSlider.get();
    imageUploadPreview.style.filter = `${currentStyle}(${saturation}${currentUnit})`;
    effectLevelValue.value = saturation;
  });
};

const updateEffects = (value) => {
  setContainerState(value);

  if (value === 'none') {
    return;
  }

  const {min, max, step, style, units} = EFFECTS[value] || EFFECTS.default;

  currentStyle = style;
  currentUnit = units;

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

export { initEffects, updateEffects };
