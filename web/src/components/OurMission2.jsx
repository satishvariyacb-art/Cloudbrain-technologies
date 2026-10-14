import React from 'react';

export default function OurMission2() {
  return (
    <section className="om2-section">
      <div className="om2-container">
        {/* Left Side Mission Text */}
        <div className="om2-header-block">
          <span className="om2-blue-pill">Our Mission 2</span>
          <h2 className="om2-headline">
            We build digital products for users through innovation to deliver real value.
          </h2>
        </div>

        {/* Right Side Visual Image */}
        <div className="om2-img-wrapper">
          <img src="/mission_target_2.1.png" alt="Our Mission 2 Target" className="om2-target-img" />
        </div>
      </div>

      <style>{`
        .om2-section {
          background-color: #FFFFFF;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(48, 133, 255, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(4, 171, 107, 0.06) 0%, transparent 45%);
          padding: 2.5rem 0 3.5rem 0;
          width: 100%;
          overflow: hidden;
        }

        .om2-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          min-height: 280px;
          box-sizing: border-box;
        }

        .om2-header-block {
          align-self: flex-start;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          max-width: 760px;
        }

        .om2-blue-pill {
          font-family: var(--font-main, Inter, sans-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          background-color: #3085FF;
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: inline-block;
          box-shadow: 0 4px 14px rgba(48, 133, 255, 0.25);
        }

        .om2-headline {
          font-family: var(--font-main, Inter, sans-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #3085FF;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
          text-align: left;
          width: 100%;
        }

        .om2-img-wrapper {
          align-self: flex-end;
          flex: 0 0 350px;
          max-width: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          overflow: visible;
          box-sizing: border-box;
        }

        .om2-target-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 1100px) {
          .om2-headline {
            font-size: 1.95rem;
          }
          .om2-img-wrapper {
            flex: 0 0 120px;
            max-width: 120px;
            margin-right: 40px;
          }
        }

        @media (max-width: 768px) {
          .om2-section {
            padding: 3rem 0 2rem 0;
          }
          .om2-container {
            flex-direction: column;
            align-items: flex-start;
            min-height: auto;
            gap: 1.5rem;
            padding: 0 1.5rem;
          }
          .om2-header-block {
            align-self: flex-start;
            max-width: 100%;
          }
          .om2-headline {
            font-size: 1.65rem;
            line-height: 1.35;
            text-align: left;
          }
          .om2-blue-pill {
            text-align: left;
            margin-bottom: 0.75rem;
          }
          .om2-img-wrapper {
            align-self: flex-end;
            flex: 0 0 auto;
            width: 110px;
            max-width: 110px;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
