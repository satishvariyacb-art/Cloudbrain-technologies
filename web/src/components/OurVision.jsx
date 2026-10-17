import React from 'react';
import OurVisionGraphic from '../utils/OurVisionGraphic';

export default function OurVision() {
  return (
    <section className="ov-v2-section">
      <div className="ov-v2-container">

        {/* Left Side: Vision Typography & Content */}
        <div className="ov-v2-content">
          <h2 className="ov-v2-title">
            Our Vision
          </h2>
          <p className="ov-v2-description">
            To be a global leader in technology, building seamless<br /> digital products that make everyday life genuinely better.
          </p>
        </div>

        {/* Right Side: Isometric Cyclone / Vortex Wireframe Graphic matching reference */}
        <div className="ov-v2-graphic-wrap" aria-hidden="true">
          <OurVisionGraphic />
        </div>

      </div>

      <style>{`
        .ov-v2-section {
          background-color: #00AF57; /* Vibrant Emerald Green matching reference */
          margin-top: -80px;
          padding: 80px var(--page-gutter) 0 var(--page-gutter);
          min-height: calc(23.5vw + 80px);
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 80px;
          border-bottom-right-radius: 80px;
          box-shadow: 0 16px 40px rgba(4, 120, 87, 0.12);
          z-index: 1;
        }

        .ov-v2-container {
          width: 100%;
          max-width: none;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3.5rem;
          position: relative;
          z-index: 1;
        }

        .ov-v2-content {
          flex: 1;
          max-width: 860px;
          text-align: left;
          container-type: inline-size;
        }

        .ov-v2-title {
          font-family: var(--font-main, 'cbsans', sans-serif);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
        }

        .ov-v2-description {
          font-family: var(--font-body, 'cbsans', sans-serif);
          font-size: 32px;
          font-weight: 400;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          max-width: 860px;
        }

        .ov-v2-graphic-wrap {
          flex: 0 0 auto;
          width: auto;
          max-width: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ov-v2-graphic-wrap svg,
        .ov-v2-wireframe-svg {
          width: auto;
          max-width: none;
          height: auto;
          max-height: min(368px, calc(23.5vw - 24px));
          filter: drop-shadow(0 12px 24px rgba(4, 120, 87, 0.25));
        }

        @media (max-width: 1600px) {
          .ov-v2-container {
            gap: 2rem;
          }

          .ov-v2-title {
            font-size: clamp(40px, 4vw, 60px);
            margin-bottom: 0.85rem;
          }

          .ov-v2-description {
            font-size: clamp(18px, 1.65vw, 24px);
            line-height: 1.45;
          }

          .ov-v2-description br {
            display: none;
          }

          .ov-v2-graphic-wrap {
            flex: 0 0 210px;
            max-width: 230px;
          }

          .ov-v2-graphic-wrap svg,
          .ov-v2-wireframe-svg {
            max-width: 100%;
            max-height: min(190px, 16vw);
          }
        }

        @media (max-width: 1100px) {
          .ov-v2-section {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (max-width: 1024px) {
          .ov-v2-section {
            margin-top: -60px;
            padding-top: 60px;
            min-height: calc(23.5vw + 60px);
            border-bottom-left-radius: 60px;
            border-bottom-right-radius: 60px;
          }
        }

        @media (max-width: 900px) {
          .ov-v2-section {
            display: block;
            min-height: 0;
            padding: 5.5rem 2rem 3rem;
          }

          .ov-v2-container {
            flex-direction: column;
            align-items: stretch;
            gap: 1.15rem;
          }

          .ov-v2-content {
            width: 100%;
            max-width: none;
          }

          .ov-v2-title {
            font-size: 2.85rem;
            line-height: 1.15;
            margin-bottom: 0.75rem;
          }

          .ov-v2-description {
            font-size: 1.2rem;
            line-height: 1.5;
            max-width: none;
          }

          .ov-v2-description br {
            display: none;
          }

          .ov-v2-graphic-wrap {
            order: -1;
            flex: 0 0 auto;
            height: auto;
            align-self: flex-start;
            max-width: 200px;
          }

          .ov-v2-graphic-wrap svg,
          .ov-v2-wireframe-svg {
            width: 100%;
            max-width: 200px;
            max-height: 168px;
          }
        }

        @media (max-width: 640px) {
          .ov-v2-section {
            margin-top: -40px;
            min-height: 0;
            padding: 4.6rem 1.25rem 2.35rem;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
          }

          .ov-v2-container {
            gap: 0.85rem;
          }

          .ov-v2-content {
            width: 100%;
            max-width: none;
          }

          .ov-v2-title {
            font-size: 2.15rem;
            line-height: 1.15;
            margin-bottom: 0.7rem;
          }

          .ov-v2-description {
            font-size: 1rem;
            line-height: 1.5;
            max-width: none;
          }

          .ov-v2-description br {
            display: none;
          }

          .ov-v2-graphic-wrap {
            order: -1;
            flex: 0 0 auto;
            height: auto;
            align-self: flex-start;
            max-width: 150px;
            margin-bottom: 0;
          }

          .ov-v2-graphic-wrap svg,
          .ov-v2-wireframe-svg {
            width: 100%;
            max-width: 150px;
            max-height: 132px;
          }
        }
      `}</style>
    </section>
  );
}
