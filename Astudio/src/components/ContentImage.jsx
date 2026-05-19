import { FALLBACK_IMAGE } from '../constants/images.js'

function ContentImage({ src, alt }) {
  function handleImageError(event) {
    event.currentTarget.onerror = null
    event.currentTarget.src = FALLBACK_IMAGE
  }

  return (
    <img
      className="content-card__image"
      src={src || FALLBACK_IMAGE}
      alt={alt}
      onError={handleImageError}
      loading="lazy"
    />
  )
}

export default ContentImage
