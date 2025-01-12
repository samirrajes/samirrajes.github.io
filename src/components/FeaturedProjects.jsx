// src/components/FeaturedProjects.jsx
import React from 'react'

export default function FeaturedProjects() {
  const featured = [
    {
      title: 'Granola',
      description: 'Granular Synth-inpired Physical Audio Sampler + Signal Processing experiment.',
      tools: ['Arduino', 'Teensy', 'Signal Processing', 'Audio Manipulation'],
    },
    {
      title: 'RoboRun',
      description: '3D Platformer in ThreeJS with a custom Physics Engine.',
      tools: ['JavaScript', 'Physics Engine', 'Collision Detection'],
    },
    {
      title: 'Generative Thesis',
      description:
        'Comparison of Diffusion Models and DCGANs for conditional text-to-image generation.',
      tools: ['PyTorch', 'GANs', 'Diffusion'],
    },
  ]

  return (
    <section className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="featured-list">
        {featured.map((project, idx) => (
          <div key={idx} className="featured-item">
            <div className="project-img-placeholder" />
            <div className="project-text">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-tools">
                Tools/Concepts:{' '}
                {project.tools.map((tool, i) => (
                  <strong key={i}>{tool}{i < project.tools.length - 1 ? ', ' : ''}</strong>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="see-all-projects-button"
        onClick={() => (window.location.href = '/projects')}
      >
        See All Projects
      </button>
    </section>
  )
}
