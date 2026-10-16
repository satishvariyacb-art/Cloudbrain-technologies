import React from 'react';
import CloudBrainLogo from './CloudBrainLogo';

const QUICK_LINKS = [
  { label: 'About Us', href: '#about', accent: true },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Philosophy', href: '#philosophy' },
  { label: 'Our Value', href: '#values' },
  { label: 'Career', href: '#careers' },
];

const SERVICE_LINKS = [
  { label: 'Android App Development', href: '#services', accent: true },
  { label: 'iOS App Development', href: '#services' },
  { label: 'UI/UX Design', href: '#services' },
  { label: 'Digital Marketing', href: '#services' },
  { label: 'Web Design & Development', href: '#services' },
  { label: 'AI & ML Development', href: '#services' },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.2M10.5 3.5V8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterWordmark() {
  return (
    <svg className="site-footer-wordmark-svg" viewBox="-74 0 2058 226" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <path d="M-74.0158 113.131C-74.0158 91.2279 -69.4699 71.7012 -60.3781 54.5508C-51.493 37.6071 -38.8885 24.2794 -22.5647 14.5677C-6.44743 4.85606 12.2527 0.000225723 33.5357 0.000225723C53.5789 0.000225723 70.5227 3.71959 84.3669 11.1583C98.2112 18.597 109.163 28.5153 117.221 40.9132C125.28 53.5177 130.342 66.5354 132.409 79.9665C132.615 81.6195 131.892 82.446 130.239 82.446H74.4486C72.7956 82.446 71.8658 81.6195 71.6591 79.9665C70.2127 72.7344 66.1834 66.2255 59.5712 60.4398C52.959 54.8608 44.0739 52.0713 32.9158 52.0713C18.6582 52.0713 7.29353 57.547 -1.17834 68.4984C-9.85685 79.4499 -14.1961 94.3273 -14.1961 113.131C-14.1961 131.521 -9.85685 146.295 -1.17834 157.453C7.29353 168.611 18.6582 174.19 32.9158 174.19C44.0739 174.19 53.1656 171.504 60.1911 166.132C67.0099 160.966 71.0392 154.87 72.279 147.845C72.4856 146.192 73.4155 145.365 75.0685 145.365H130.239C131.892 145.365 132.615 146.192 132.409 147.845C130.342 161.069 125.28 173.777 117.221 185.968C109.163 198.366 98.2112 208.181 84.3669 215.413C70.5227 222.645 53.5789 226.261 33.5357 226.261C12.2527 226.261 -6.44743 221.405 -22.5647 211.694C-38.8885 201.982 -51.493 188.551 -60.3781 171.401C-69.4699 154.457 -74.0158 135.034 -74.0158 113.131ZM161.098 5.26932H215.029C216.682 5.26932 217.508 6.09585 217.508 7.7489V170.161H315.452C317.105 170.161 317.931 170.987 317.931 172.641V218.513C317.931 220.166 317.105 220.992 315.452 220.992H161.098C159.445 220.992 158.619 220.166 158.619 218.513V7.7489C158.619 6.09585 159.445 5.26932 161.098 5.26932ZM447.886 226.261C431.355 226.261 416.271 223.368 402.634 217.583C388.789 212.004 376.805 204.048 366.68 193.717C356.555 183.592 348.806 171.607 343.434 157.763C337.855 144.125 335.065 129.248 335.065 113.131C335.065 97.0135 337.855 82.0328 343.434 68.1885C348.806 54.5508 356.555 42.5662 366.68 32.2347C376.805 22.1098 388.789 14.1545 402.634 8.36879C416.271 2.78975 431.355 0.000225723 447.886 0.000225723C464.416 0.000225723 479.604 2.78975 493.448 8.36879C507.086 14.1545 518.967 22.1098 529.092 32.2347C539.217 42.5662 547.069 54.5508 552.648 68.1885C558.02 82.0328 560.706 97.0135 560.706 113.131C560.706 129.248 558.02 144.125 552.648 157.763C547.069 171.607 539.217 183.592 529.092 193.717C518.967 204.048 507.086 212.004 493.448 217.583C479.604 223.368 464.416 226.261 447.886 226.261ZM500.887 113.131C500.887 100.94 498.717 90.1947 494.378 80.8963C489.832 71.8045 483.633 64.6758 475.781 59.51C467.722 54.5508 458.424 52.0713 447.886 52.0713C437.554 52.0713 428.359 54.5508 420.301 59.51C412.242 64.6758 406.043 71.8045 401.704 80.8963C397.158 90.1947 394.885 100.94 394.885 113.131C394.885 125.322 397.158 135.963 401.704 145.055C406.043 154.354 412.242 161.482 420.301 166.442C428.359 171.607 437.554 174.19 447.886 174.19C458.424 174.19 467.722 171.607 475.781 166.442C483.633 161.482 489.832 154.354 494.378 145.055C498.717 135.963 500.887 125.322 500.887 113.131ZM587.064 5.26932H640.995C642.648 5.26932 643.474 6.09585 643.474 7.7489V119.02C643.474 135.963 646.367 149.395 652.153 159.313C657.938 169.231 668.167 174.19 682.838 174.19C697.715 174.19 708.047 169.231 713.832 159.313C719.618 149.395 722.511 135.963 722.511 119.02V7.7489C722.511 6.09585 723.337 5.26932 724.99 5.26932H778.921C780.574 5.26932 781.401 6.09585 781.401 7.7489V126.458C781.401 146.708 777.681 164.272 770.242 179.149C762.597 194.233 751.542 205.805 737.078 213.863C722.407 222.129 704.327 226.261 682.838 226.261C661.555 226.261 643.681 222.129 629.217 213.863C614.546 205.805 603.491 194.233 596.052 179.149C588.407 164.272 584.584 146.708 584.584 126.458V7.7489C584.584 6.09585 585.411 5.26932 587.064 5.26932ZM818.306 5.26932H902.302C925.444 5.26932 945.384 9.71189 962.121 18.597C978.652 27.4822 991.36 39.9834 1000.24 56.1006C1009.13 72.2178 1013.57 91.2279 1013.57 113.131C1013.57 134.827 1009.13 153.734 1000.24 169.851C991.36 186.175 978.652 198.779 962.121 207.664C945.384 216.55 925.444 220.992 902.302 220.992H818.306C816.653 220.992 815.826 220.166 815.826 218.513V7.7489C815.826 6.09585 816.653 5.26932 818.306 5.26932ZM898.582 170.161C916.352 170.161 929.99 165.202 939.495 155.283C949 145.365 953.753 131.314 953.753 113.131C953.753 94.7406 949 80.5864 939.495 70.6681C929.99 60.9564 916.352 56.1006 898.582 56.1006H874.716V170.161H898.582ZM1042.82 5.26932H1140.77C1155.02 5.26932 1167.84 7.54227 1179.2 12.0882C1190.56 16.634 1199.55 23.2462 1206.17 31.9247C1212.57 40.8099 1215.77 51.658 1215.77 64.4691C1215.77 85.7521 1205.96 100.32 1186.33 108.172C1198.31 112.098 1207.51 118.297 1213.91 126.768C1220.32 135.24 1223.52 145.572 1223.52 157.763C1223.52 170.781 1220.11 181.939 1213.29 191.237C1206.27 200.742 1196.76 208.078 1184.78 213.244C1172.79 218.409 1159.16 220.992 1143.87 220.992H1042.82C1041.17 220.992 1040.34 220.166 1040.34 218.513V7.7489C1040.34 6.09585 1041.17 5.26932 1042.82 5.26932ZM1097.99 52.3812V87.7151H1134.57C1150.89 87.7151 1159.05 81.8261 1159.05 70.0482C1159.05 58.2702 1150.89 52.3812 1134.57 52.3812H1097.99ZM1097.99 133.587V173.88H1139.84C1156.78 173.88 1165.25 167.165 1165.25 153.734C1165.25 140.303 1156.78 133.587 1139.84 133.587H1097.99ZM1253.42 5.26932H1347.33C1364.28 5.26932 1379.05 8.36879 1391.65 14.5677C1404.26 20.7667 1414.07 29.4452 1421.1 40.6032C1428.12 51.7613 1431.64 64.7791 1431.64 79.6565C1431.64 94.1207 1428.33 106.829 1421.72 117.78C1415.11 128.938 1405.91 137.617 1394.13 143.815L1444.65 218.823C1445.48 220.269 1445.07 220.992 1443.42 220.992H1382.36C1380.7 220.992 1379.46 220.269 1378.64 218.823L1337.1 154.664H1309.83V218.513C1309.83 220.166 1309 220.992 1307.35 220.992H1253.42C1251.76 220.992 1250.94 220.166 1250.94 218.513V7.7489C1250.94 6.09585 1251.76 5.26932 1253.42 5.26932ZM1338.34 105.382C1350.12 105.382 1358.7 103.109 1364.07 98.5633C1369.23 94.224 1371.82 87.7151 1371.82 79.0366C1371.82 70.5648 1369.23 64.3658 1364.07 60.4398C1358.7 56.5138 1350.12 54.5508 1338.34 54.5508H1309.83V105.382H1338.34ZM1529.64 5.26932H1586.98C1588.63 5.26932 1589.77 6.09585 1590.39 7.7489L1668.19 218.513C1668.81 220.166 1668.29 220.992 1666.64 220.992H1609.3C1607.64 220.992 1606.51 220.166 1605.89 218.513L1594.42 183.799H1519.1L1507.63 218.513C1507.01 220.166 1505.88 220.992 1504.23 220.992H1449.98C1448.33 220.992 1447.81 220.166 1448.43 218.513L1526.23 7.7489C1526.85 6.09585 1527.99 5.26932 1529.64 5.26932ZM1556.92 69.1183L1535.53 133.897H1577.99L1556.92 69.1183ZM1691.56 5.26932H1745.49C1747.14 5.26932 1747.97 6.09585 1747.97 7.7489V218.513C1747.97 220.166 1747.14 220.992 1745.49 220.992H1691.56C1689.9 220.992 1689.08 220.166 1689.08 218.513V7.7489C1689.08 6.09585 1689.9 5.26932 1691.56 5.26932ZM1787.74 5.26932H1839.19C1840.84 5.26932 1842.18 5.99254 1843.22 7.43896L1927.52 131.418V7.7489C1927.52 6.09585 1928.35 5.26932 1930 5.26932H1981.14C1982.8 5.26932 1983.62 6.09585 1983.62 7.7489V218.513C1983.62 220.166 1982.8 220.992 1981.14 220.992H1929.69C1928.04 220.992 1926.7 220.269 1925.66 218.823L1841.36 94.8439V218.513C1841.36 220.166 1840.53 220.992 1838.88 220.992H1787.74C1786.08 220.992 1785.26 220.166 1785.26 218.513V7.7489C1785.26 6.09585 1786.08 5.26932 1787.74 5.26932Z" fill="url(#footerWordmarkGradient)" fillOpacity="0.2" />
      <defs>
        <linearGradient id="footerWordmarkGradient" x1="960" y1="-34.1182" x2="960" y2="236.882" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Footer({ onNavClick, curved = false }) {
  const handleClick = (event, href) => {
    event.preventDefault();
    if (onNavClick) onNavClick(href);
  };

  return (
    <footer className={`site-footer${curved ? ' is-curved' : ''}`}>
      <div className="site-footer-glow" aria-hidden="true" />

      <div className="site-footer-inner">
        <a
          href="#hero"
          className="site-footer-logo"
          aria-label="Cloudbrain Home"
          onClick={(event) => handleClick(event, '#hero')}
        >
          <CloudBrainLogo height={82} variant="light" />
        </a>

        <p className="site-footer-tagline">
          Enabling digital transformation strategies, problem solving benchmarks and agile business models and helping our
          <br />
          clients to digitalize, scale and transform into high performance businesses.
        </p>

        <div className="site-footer-grid">
          <nav className="site-footer-col" aria-label="Quick Links">
            <h2>Quick Links</h2>
            <ul>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={item.accent ? 'is-accent' : undefined}
                    onClick={(event) => handleClick(event, item.href)}
                  >
                    {item.label}
                    {item.accent ? <ArrowIcon /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer-col" aria-label="Our Services">
            <h2>Our Services</h2>
            <ul>
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={item.accent ? 'is-accent' : undefined}
                    onClick={(event) => handleClick(event, item.href)}
                  >
                    {item.label}
                    {item.accent ? <ArrowIcon /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-col">
            <h2>Contact Information</h2>
            <ul className="site-footer-contact">
              <li>
                <span className="site-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <span>
                  <span className="site-footer-contact-label">Call us on</span>
                  <a href="tel:+12345678900">+1 (234) 567-8900</a>
                </span>
              </li>
              <li>
                <span className="site-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </span>
                <span>
                  <span className="site-footer-contact-label">Reach out</span>
                  <a href="mailto:contact@cloudbraintechnologies.com">contact@cloudbraintechnologies.com</a>
                </span>
              </li>
              <li>
                <span className="site-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </span>
                <span>
                  <span className="site-footer-contact-label">Location</span>
                  <span>1010, Silver Trade Center, Oppo, Power Station, near Moon Garden, Utran, Surat, Gujarat 394105</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer-copy">© 2020 CloudBrain Technologies Pvt. Ltd. All Rights Reserved</p>
      </div>

      <div className="site-footer-wordmark">
        <FooterWordmark />
      </div>

      <style>{`
        .site-footer {
          position: relative;
          z-index: 0;
          background: #07111f;
          color: #e8eef8;
          overflow: hidden;
        }

        .site-footer-glow {
          position: absolute;
          left: 50%;
          top: 36px;
          width: 210%;
          height: 640px;
          transform: translateX(-50%);
          background:
            radial-gradient(ellipse 40% 46% at 50% 0%, rgba(36, 132, 196, 0.55) 0%, rgba(18, 78, 168, 0.28) 42%, rgba(7, 17, 31, 0) 74%),
            radial-gradient(ellipse 68% 62% at 50% 0%, rgba(14, 58, 140, 0.72) 0%, rgba(10, 36, 96, 0.34) 48%, rgba(7, 17, 31, 0) 80%);
          pointer-events: none;
        }

        .site-footer.is-curved {
          margin-top: -160px;
        }

        .site-footer.is-curved .site-footer-inner {
          padding-top: calc(6.5rem + 160px);
        }

        .site-footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1222px;
          margin: 0 auto;
          padding: 7.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .site-footer-logo {
          display: inline-flex;
          margin-bottom: 1.75rem;
        }

        .site-footer-logo:focus-visible {
          outline: 2px solid #3085FF;
          outline-offset: 4px;
          border-radius: 8px;
        }

        .site-footer-tagline {
          max-width: 980px;
          margin: 0 0 7.5rem;
          text-align: center;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.65;
          color: #4A5565;
        }

        .site-footer-grid {
          width: 100%;
          max-width: 1174px;
          display: grid;
          grid-template-columns: 0.85fr 1.05fr 1.35fr;
          column-gap: 61px;
          row-gap: 2.75rem;
          margin-bottom: 8rem;
        }

        .site-footer-col h2 {
          margin: 0 0 1.5rem;
          font-family: var(--font-main);
          font-size: 18px;
          font-weight: 500;
          color: #9aa8bd;
        }

        .site-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.05rem;
        }

        .site-footer-col a {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #d5deea;
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.4;
          text-decoration: none;
        }

        .site-footer-col a:hover {
          color: #3085FF;
        }

        .site-footer-col a:focus-visible {
          outline: 2px solid #3085FF;
          outline-offset: 3px;
          border-radius: 4px;
        }

        .site-footer-contact {
          gap: 1.4rem;
        }

        .site-footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          color: #d5deea;
          font-size: 18px;
          line-height: 1.45;
        }

        .site-footer-contact-label {
          display: block;
          color: #d5deea;
        }

        .site-footer-icon {
          flex: 0 0 auto;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .site-footer-copy {
          margin: 0;
          text-align: center;
          font-family: var(--font-body);
          font-size: 16px;
          color: #8b97ab;
        }

        .site-footer-wordmark {
          position: relative;
          z-index: 1;
          margin-top: 1.5rem;
          padding: 0;
          line-height: 0;
        }

        .site-footer-wordmark-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        @media (max-width: 860px) {
          .site-footer-inner {
            padding-top: 5.5rem;
            align-items: flex-start;
          }

          .site-footer-tagline,
          .site-footer-copy {
            text-align: left;
          }

          .site-footer-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
            margin-bottom: 3rem;
          }
        }

        @media (max-width: 900px) {
          .site-footer.is-curved {
            margin-top: -72px;
          }

          .site-footer.is-curved .site-footer-inner {
            padding-top: calc(5.5rem + 72px);
          }
        }

        @media (max-width: 640px) {
          .site-footer-tagline {
            margin-bottom: 2.75rem;
          }

          .site-footer.is-curved {
            margin-top: -48px;
          }

          .site-footer.is-curved .site-footer-inner {
            padding-top: calc(5rem + 48px);
          }
        }
      `}</style>
    </footer>
  );
}
