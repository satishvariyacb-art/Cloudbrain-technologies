import React from 'react';

export default function OurVision() {
  return (
    <section className="our-vision-section">
      <div className="vision-container">
        {/* Left Side Visual Image */}
        <div className="vision-svg-wrapper">
          <img 
            src="/vision_graphic.png" 
            alt="Our Vision" 
            className="vision-img" 
          />
        </div>

        {/* Right Side Vision Text */}
        <div className="vision-header-block">
          <div className="vision-label-wrapper">
            <span className="vision-label">OUR VISION</span>
            <svg className="vision-label-svg" width="149" height="43" viewBox="0 0 149 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M65.6477 15.5867C64.9154 17.7489 64.6732 20.0023 64.9298 22.2662C65.2325 24.5177 65.9761 26.7508 67.1392 28.9013C68.2265 31.0134 69.6625 33.0433 71.4162 34.9471C73.1568 36.855 75.3394 38.5554 77.8641 39.9706C79.141 40.6806 80.544 41.2636 82.0297 41.7014C83.5663 42.1702 85.2068 42.4014 86.8347 42.3786C88.65 42.339 90.351 41.8703 91.6669 41.0471C92.9796 40.1788 93.889 39.0477 94.2896 37.7852C94.4956 37.2001 94.632 36.6006 94.6973 35.9928C94.7336 35.4092 94.7263 34.8224 94.6754 34.235C94.6284 33.6699 94.5293 33.105 94.3789 32.5438L94.1845 31.6724L93.9111 30.8614C93.1634 28.8032 92.138 26.7871 90.8495 24.8414C89.6231 22.9244 88.0291 21.1206 86.1151 19.4836C84.2979 17.932 82.1889 16.559 79.8541 15.4074L79.0188 14.9843L78.1415 14.6168C77.5687 14.3729 76.9726 14.1183 76.4102 13.8925C75.2576 13.451 74.0775 13.0505 72.8745 12.6924C72.1761 12.4873 71.4632 12.3064 70.7502 12.1255C71.0355 11.7018 71.3399 11.3312 71.6638 10.8858C72.9526 9.28427 74.5542 7.82788 76.4256 6.55579C78.2408 5.35531 80.3254 4.37053 82.6075 3.63543C87.0372 2.32892 91.9016 1.77005 96.8353 2.00083C101.458 2.21945 106.061 2.89024 110.511 3.99385C114.59 4.99497 118.571 6.22167 122.415 7.66198C125.801 8.89999 129.082 10.2905 132.236 11.8241C136.875 14.0565 141.017 16.7844 144.498 19.8997C146.942 22.1686 147.965 23.65 148.123 23.5376C148.01 23.1547 147.807 22.7833 147.524 22.439C146.833 21.4324 146.037 20.4594 145.143 19.5286C141.843 16.2091 137.771 13.2892 133.118 10.9052C129.966 9.25686 126.671 7.7566 123.256 6.41516C119.365 4.85808 115.321 3.51967 111.166 2.41334C106.542 1.17711 101.74 0.397634 96.9007 0.0981345C91.5606 -0.2385 86.2696 0.293873 81.4384 1.65391C78.8526 2.43966 76.4835 3.51182 74.415 4.83242C72.2788 6.2294 70.448 7.84184 68.9745 9.62406C68.4543 10.2324 67.9855 10.8635 67.5707 11.5144C64.7759 10.9854 61.937 10.6319 59.0882 10.4584C51.5079 10.0419 43.9611 10.4138 36.6918 11.5622C31.4132 12.3679 26.2658 13.4776 21.2996 14.8806C15.7771 16.4043 10.5464 18.3557 5.69799 20.7011L4.23321 21.4775L4.85938 20.3118C5.48347 19.0436 5.98445 17.7889 6.44343 16.5897C7.2125 14.4583 7.74467 12.2768 8.03529 10.0644C8.52957 6.27771 8.10489 3.90919 7.66898 3.88336C7.23307 3.85752 6.75393 6.12861 5.71264 9.65693C5.16101 11.4266 4.48048 13.5159 3.49137 15.7709C3.00202 16.9075 2.4482 18.0803 1.81952 19.2713C1.4927 19.8699 1.16506 20.4769 0.813282 21.0815C0.63698 21.388 0.452749 21.6511 0.236545 22.1157C-0.0688429 22.717 -0.0790852 23.3865 0.207367 24.0219C0.371817 24.3601 0.630975 24.6757 0.968721 24.9491C1.23782 25.1607 1.54284 25.3483 1.87596 25.5071C2.37534 25.7329 2.90385 25.9221 3.45247 26.0713C4.31642 26.3267 5.18205 26.5653 6.02271 26.8099C7.71775 27.2835 9.35498 27.7258 10.9215 28.1441C14.0578 28.9469 16.8697 29.5815 19.328 30.096C24.1031 31.0771 27.1965 31.4496 27.3142 31.1202C27.4318 30.7909 24.5817 29.8031 19.9599 28.3769L11.8332 25.9326C10.3031 25.4752 8.70615 24.9943 7.04258 24.4897C6.21482 24.2378 5.36294 23.9836 4.51105 23.7293C4.48757 23.7233 4.46288 23.7209 4.43868 23.7222C5.09333 23.5054 6.0025 23.1772 7.2702 22.6712C12.2343 20.7366 17.3969 19.0436 22.7248 17.6032C27.5606 16.3384 32.5444 15.3276 37.6373 14.5786C44.5616 13.5253 51.7351 13.1891 58.9395 13.5802C61.3215 13.732 63.6963 14.014 66.0422 14.4238C65.8826 14.8086 65.7229 15.1935 65.5874 15.5808L65.6477 15.5867ZM71.5815 15.6846C72.6527 15.9913 73.7042 16.3366 74.7316 16.7189C75.2362 16.9134 75.7383 17.1333 76.2532 17.3459L77.0132 17.6678L77.7441 18.038C79.765 19.0123 81.5875 20.1857 83.1503 21.5187C84.8151 22.9242 86.2044 24.4756 87.2764 26.1263C88.4605 27.8657 89.4047 29.6716 90.0954 31.5174L90.3434 32.2151L90.5191 32.9056C90.6392 33.361 90.7242 33.8189 90.7739 34.2773C90.8505 34.7366 90.7994 35.1321 90.8124 35.6192C90.7729 36.0379 90.6834 36.4511 90.5447 36.8543C90.4019 37.5679 89.9241 38.2113 89.1859 38.6843C88.4477 39.1574 87.4905 39.4336 86.4632 39.4699C84.0748 39.4101 81.7313 38.7668 79.834 37.6502C77.662 36.4534 75.776 35.0134 74.2605 33.3944C72.6597 31.6918 71.3419 29.8739 70.3355 27.9799C69.2675 26.0928 68.5711 24.1279 68.2668 22.1427C68.0233 20.1619 68.2174 18.1883 68.8423 16.293C68.9682 15.8792 69.1183 15.4678 69.2796 15.0661C70.0649 15.2541 70.8373 15.4494 71.6555 15.6748" fill="white"/>
            </svg>
          </div>
          <h2 className="vision-headline">
            To be a global leader in technology, building seamless digital products that make everyday life genuinely better.
          </h2>
        </div>
      </div>

      <style>{`
        .our-vision-section {
          background-color: #04AB6B;
          padding: 2.5rem 0;
          width: 100%;
          overflow: hidden;
        }

        .vision-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .vision-svg-wrapper {
          flex: 0 0 500px;
          max-width: 500px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .vision-img {
          width: 100%;
          height: auto;
          display: block;
          mix-blend-mode: screen;
          object-fit: contain;
        }

        .vision-header-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          max-width: 680px;
          margin-left: auto;
        }

        .vision-label-wrapper {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-end;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .vision-label {
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

        .vision-label-svg {
          width: 150px;
          height: auto;
          margin-top: 0.05rem;
        }

        .vision-headline {
          font-family: var(--font-main, Inter, sans-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
        }

        @media (max-width: 1100px) {
          .vision-headline {
            font-size: 1.95rem;
          }
          .vision-svg-wrapper {
            flex: 0 0 420px;
            max-width: 620px;
          }
        }

        @media (max-width: 768px) {
          .our-vision-section {
            padding: 2.5rem 0 0 0;
          }
          .vision-container {
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            gap: 0;
            padding: 0 1rem;
            text-align: center;
          }
          .vision-header-block {
            align-items: center;
            text-align: center;
            max-width: 100%;
            margin: 0 auto;
          }
          .vision-label-wrapper {
            align-items: center;
            margin-bottom: 0.75rem;
          }
          .vision-headline {
            font-size: 1.65rem;
            line-height: 1.35;
            text-align: center;
            margin-bottom: 0;
          }
          .vision-label {
            text-align: center;
            margin-bottom: 0.15rem;
          }
          .vision-label-svg {
            margin: -0.25rem auto 0 auto;
          }
          .vision-svg-wrapper {
            width: 100%;
            max-width: 520px;
            margin: -0.5rem auto 0 auto;
            align-self: center;
          }
          .vision-img {
            width: 100%;
            height: auto;
            display: block;
            mix-blend-mode: screen;
            margin-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
