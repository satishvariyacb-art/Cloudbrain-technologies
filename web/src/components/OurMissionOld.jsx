import React from 'react';

export default function OurMission() {
  return (
    <section className="om1-section">
      <div className="om1-container">
        {/* Left Side Mission Text */}
        <div className="om1-header-block">
          <div className="om1-label-wrapper">
            <span className="om1-label">Our Mission</span>
            <svg className="om1-label-svg" width="149" height="43" viewBox="0 0 149 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M82.4749 15.5867C83.2071 17.7489 83.4493 20.0023 83.1928 22.2662C82.8901 24.5177 82.1465 26.7508 80.9834 28.9013C79.8961 31.0134 78.4601 33.0433 76.7064 34.9471C74.9658 36.855 72.7832 38.5554 70.2584 39.9706C68.9816 40.6806 67.5786 41.2636 66.0929 41.7014C64.5562 42.1702 62.9157 42.4014 61.2878 42.3786C59.4726 42.339 57.7716 41.8703 56.4557 41.0471C55.143 40.1788 54.2336 39.0477 53.8329 37.7852C53.627 37.2001 53.4906 36.6006 53.4252 35.9928C53.389 35.4092 53.3963 34.8224 53.4472 34.235C53.4942 33.6699 53.5932 33.105 53.7437 32.5438L53.9381 31.6724L54.2115 30.8614C54.9592 28.8032 55.9846 26.7871 57.273 24.8414C58.4995 22.9244 60.0934 21.1206 62.0074 19.4836C63.8247 17.932 65.9336 16.559 68.2685 15.4074L69.1038 14.9843L69.981 14.6168C70.5538 14.3729 71.1499 14.1183 71.7123 13.8925C72.8649 13.451 74.0451 13.0505 75.248 12.6924C75.9464 12.4873 76.6594 12.3064 77.3723 12.1255C77.0871 11.7018 76.7827 11.3312 76.4587 10.8858C75.1699 9.28427 73.5683 7.82788 71.697 6.55579C69.8818 5.35531 67.7972 4.37053 65.515 3.63543C61.0854 2.32892 56.2209 1.77005 51.2873 2.00083C46.6642 2.21945 42.0612 2.89024 37.6112 3.99385C33.5321 4.99497 29.5513 6.22167 25.7076 7.66198C22.3214 8.89999 19.0404 10.2905 15.8865 11.8241C11.2477 14.0565 7.10573 16.7844 3.62481 19.8997C1.18075 22.1686 0.157259 23.65 5.4231e-05 23.5376C0.113007 23.1547 0.315263 22.7833 0.598379 22.439C1.28916 21.4324 2.08515 20.4594 2.97933 19.5286C6.2794 16.2091 10.3512 13.2892 15.0045 10.9052C18.1567 9.25686 21.4519 7.7566 24.8664 6.41516C28.7578 4.85808 32.8013 3.51967 36.9564 2.41334C41.5801 1.17711 46.383 0.397634 51.2219 0.0981345C56.5619 -0.2385 61.853 0.293873 66.6842 1.65391C69.2699 2.43966 71.639 3.51182 73.7076 4.83242C75.8438 6.2294 77.6745 7.84184 79.148 9.62406C79.6683 10.2324 80.137 10.8635 80.5519 11.5144C83.3467 10.9854 86.1856 10.6319 89.0343 10.4584C96.6147 10.0419 104.161 10.4138 111.431 11.5622C116.709 12.3679 121.857 13.4776 126.823 14.8806C132.345 16.4043 137.576 18.3557 142.425 20.7011L143.889 21.4775L143.263 20.3118C142.639 19.0436 142.138 17.7889 141.679 16.5897C140.91 14.4583 140.378 12.2768 140.087 10.0644C139.593 6.27771 140.018 3.90919 140.454 3.88336C140.889 3.85752 141.369 6.12861 142.41 9.65693C142.962 11.4266 143.642 13.5159 144.631 15.7709C145.121 16.9075 145.674 18.0803 146.303 19.2713C146.63 19.8699 146.958 20.4769 147.309 21.0815C147.486 21.388 147.67 21.6511 147.886 22.1157C148.191 22.717 148.202 23.3865 147.915 24.0219C147.751 24.3601 147.492 24.6757 147.154 24.9491C146.885 25.1607 146.58 25.3483 146.247 25.5071C145.747 25.7329 145.219 25.9221 144.67 26.0713C143.806 26.3267 142.941 26.5653 142.1 26.8099C140.405 27.2835 138.768 27.7258 137.201 28.1441C134.065 28.9469 131.253 29.5815 128.795 30.096C124.019 31.0771 120.926 31.4496 120.808 31.1202C120.691 30.7909 123.541 29.8031 128.163 28.3769L136.289 25.9326C137.82 25.4752 139.416 24.9943 141.08 24.4897C141.908 24.2378 142.76 23.9836 143.612 23.7293C143.635 23.7233 143.66 23.7209 143.684 23.7222C143.029 23.5054 142.12 23.1772 140.852 22.6712C135.888 20.7366 130.726 19.0436 125.398 17.6032C120.562 16.3384 115.578 15.3276 110.485 14.5786C103.561 13.5253 96.3874 13.1891 89.1831 13.5802C86.801 13.732 84.4262 14.014 82.0803 14.4238C82.24 14.8086 82.3996 15.1935 82.5352 15.5808L82.4749 15.5867ZM76.5411 15.6846C75.4699 15.9913 74.4184 16.3366 73.3909 16.7189C72.8864 16.9134 72.3843 17.1333 71.8693 17.3459L71.1093 17.6678L70.3785 18.038C68.3575 19.0123 66.5351 20.1857 64.9723 21.5187C63.3074 22.9242 61.9182 24.4756 60.8461 26.1263C59.6621 27.8657 58.7178 29.6716 58.0272 31.5174L57.7792 32.2151L57.6035 32.9056C57.4834 33.361 57.3983 33.8189 57.3487 34.2773C57.2721 34.7366 57.3232 35.1321 57.3102 35.6192C57.3496 36.0379 57.4391 36.4511 57.5778 36.8543C57.7207 37.5679 58.1984 38.2113 58.9367 38.6843C59.6749 39.1574 60.6321 39.4336 61.6594 39.4699C64.0477 39.4101 66.3913 38.7668 68.2885 37.6502C70.4606 36.4534 72.3466 35.0134 73.8621 33.3944C75.4629 31.6918 76.7806 29.8739 77.787 27.9799C78.8551 26.0928 79.5514 24.1279 79.8557 22.1427C80.0993 20.1619 79.9052 18.1883 79.2803 16.293C79.1543 15.8792 79.0043 15.4678 78.843 15.0661C78.0577 15.2541 77.2852 15.4494 76.467 15.6748" fill="white"/>
            </svg>
          </div>
          <h2 className="om1-headline">
            We build digital products for users through innovation to deliver real value.
          </h2>
        </div>

        {/* Right Side Visual Image */}
        <div className="om1-img-wrapper">
          <img src="/mission_target.png" alt="Our Mission Target" className="om1-target-img" />
        </div>
      </div>

      <style>{`
        .om1-section {
          background-color: var(--brand-primary, #3085FF);
          padding: 4.5rem 0 3.5rem 0;
          width: 100%;
          overflow: hidden;
        }

        .om1-container {
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

        .om1-header-block {
          align-self: flex-start;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          max-width: 760px;
        }

        .om1-label-wrapper {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .om1-label {
          font-family: var(--font-fancy, var(--font-main, Inter, sans-serif));
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.15rem;
          opacity: 0.95;
        }

        .om1-label-svg {
          width: 140px;
          height: auto;
          display: block;
          margin-top: -0.35rem;
        }

        .om1-headline {
          font-family: var(--font-main, Inter, sans-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
          text-align: left;
          width: 100%;
        }

        .om1-img-wrapper {
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

        .om1-target-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 1100px) {
          .om1-headline {
            font-size: 1.95rem;
          }
          .om1-img-wrapper {
            flex: 0 0 120px;
            max-width: 120px;
            margin-right: 40px;
          }
        }

        @media (max-width: 768px) {
          .om1-section {
            padding: 3rem 0 2.5rem 0;
          }
          .om1-container {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: auto;
            gap: 2rem;
            padding: 0 1.5rem;
            text-align: center;
          }
          .om1-header-block {
            align-self: center;
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
          .om1-label-wrapper {
            align-items: center;
            margin-bottom: 1.25rem;
          }
          .om1-headline {
            font-size: 1.65rem;
            line-height: 1.35;
            text-align: center;
          }
          .om1-label {
            text-align: center;
            margin-bottom: 0.15rem;
          }
          .om1-label-svg {
            margin: -0.25rem auto 0 auto;
          }
          .om1-img-wrapper {
            align-self: center;
            flex: 0 0 auto;
            width: 180px;
            max-width: 180px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
