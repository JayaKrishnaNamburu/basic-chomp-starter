import React from 'react'

import PropTypes from 'prop-types'

import styles from './gallery-card1.module.css'

const GalleryCard1 = (props) => {
  return (
    <div
      className={` ${styles['GalleryCard']} ${styles[props.rootClassName]} `}
    >
      <img
        alt={props.image_alt}
        src={props.image_src}
        className={styles['image']}
      />
      <h2 className={styles['text']}>{props.title}</h2>
      <span className={styles['text1']}>{props.subtitle}</span>
    </div>
  )
}

GalleryCard1.defaultProps = {
  image_src: '/playground_assets/avatar1510847915-0.jpeg',
  rootClassName: '',
  subtitle: 'Lorem ipsum dolor sit amet',
  image_alt: 'image',
  title: 'Project Title',
}

GalleryCard1.propTypes = {
  image_src: PropTypes.string,
  rootClassName: PropTypes.string,
  subtitle: PropTypes.string,
  image_alt: PropTypes.string,
  title: PropTypes.string,
}

export default GalleryCard1
