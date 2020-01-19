import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { Layout, PreviewCompatibleImage } from '../components';


const MainPitch = ({ title, description }) =>
  <section id="main-pitch">
    <h2>{title}</h2>
    <p>{description}</p>
  </section>
;

const Gallery = ({ blurbs }) =>
  <section id="gallery">
    {blurbs.map( (item, index) =>
      <figure key={`galleryItem${index}`}>
        <PreviewCompatibleImage imageInfo={item.image} />
        <figcaption>
          {item.caption}
        </figcaption>
      </figure>
    )}
  </section>
;

export const IndexPageTemplate = ({
  title,
  image,
  mainpitch,
  gallery,
}) => (
  <>
    <section>
      <h1>{title}</h1>
      <PreviewCompatibleImage imageInfo={image} />
    </section>
    <MainPitch {...mainpitch} />
    <Gallery {...gallery} />
  </>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mainpitch: PropTypes.object,
  gallery: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate {...frontmatter} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        gallery {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            caption
          }
        }
      }
    }
  }
`
