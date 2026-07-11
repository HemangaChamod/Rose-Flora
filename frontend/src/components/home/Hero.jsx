import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const slides = [
    {
      image: "/img/slider/3.jpeg",
      title: "Fresh Flowers",
      subtitle: "Flowers for Every Special Moment",
      description:
        "Discover fresh and beautifully arranged flowers, make special moments unforgettable.",
    },
    {
      image: "/img/slider/1.jpeg",
      title: "Elegant Bouquets",
      subtitle: "Send Love with Flowers",
      description:
        "Explore our collection of elegant bouquets and flower arrangements.",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <style>{`
        .hero-slider {
          position: relative;
          width: 100%;
          height: 750px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .hero-slide {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 750px;

          background-size: cover;
          background-position: center;

          display: flex;
          align-items: center;

          opacity: 0;
          visibility: hidden;

          transform: scale(1.05);

          transition:
            opacity 1.2s ease,
            visibility 1.2s ease,
            transform 6s ease;
        }

        .hero-slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          z-index: 2;
        }

        .hero-content {
          max-width: 560px;
          margin-left: 120px;

          opacity: 0;
          transform: translateY(35px);

          transition:
            opacity 0.8s ease 0.35s,
            transform 0.8s ease 0.35s;
        }

        .hero-slide.active .hero-content {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-content h1 {
          font-size: 58px;
          font-weight: 700;
          color: #2f2f2f;
          margin-bottom: 10px;
        }

        .hero-content h5 {
          font-size: 32px;
          color: #666;
          margin-bottom: 25px;
          font-weight: 400;
        }

        .hero-line {
          width: 120px;
          height: 3px;
          background: #e54d74;
          margin-bottom: 30px;

          transform: scaleX(0);
          transform-origin: left;

          transition: transform 0.8s ease 0.7s;
        }

        .hero-slide.active .hero-line {
          transform: scaleX(1);
        }

        .hero-content p {
          font-size: 18px;
          color: #555;
          line-height: 1.8;
          margin-bottom: 45px;
        }

        .hero-btn {
          display: inline-block;
          background: #e54d74;
          color: #fff;

          padding: 18px 50px;

          border-radius: 40px;

          text-decoration: none;

          font-size: 20px;
          font-weight: 600;

          transition:
            background 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .hero-btn:hover {
          background: #d93863;
          color: #fff;

          transform: translateY(-3px);

          box-shadow: 0 12px 25px rgba(229, 77, 116, 0.3);
        }

        .hero-arrow {
          position: absolute;

          top: 50%;
          transform: translateY(-50%);

          width: 65px;
          height: 65px;

          background: rgba(255, 255, 255, 0.9);

          border: 1px solid #ddd;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          font-size: 30px;

          transition:
            background 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease;

          z-index: 10;
        }

        .hero-arrow:hover {
          background: #e54d74;
          color: #fff;

          transform:
            translateY(-50%)
            translateX(3px);
        }

        .hero-next {
          right: 60px;
        }

        .hero-dots {
          position: absolute;

          bottom: 50px;
          left: 50%;

          transform: translateX(-50%);

          display: flex;
          gap: 10px;

          z-index: 10;
        }

        .hero-dot {
          width: 10px;
          height: 10px;

          padding: 0;

          border: none;
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.7);

          cursor: pointer;

          transition:
            width 0.3s ease,
            border-radius 0.3s ease,
            background 0.3s ease;
        }

        .hero-dot.active {
          width: 30px;

          border-radius: 20px;

          background: #e54d74;
        }

        @media (max-width: 992px) {
          .hero-slider {
            height: 650px;
          }

          .hero-slide {
            height: 650px;
          }

          .hero-content {
            margin: 0 30px;
            max-width: 520px;
          }

          .hero-content h1 {
            font-size: 48px;
          }

          .hero-content h5 {
            font-size: 24px;
          }

          .hero-content p {
            font-size: 18px;
          }

          .hero-next {
            right: 20px;
          }
        }

        @media (max-width: 576px) {
          .hero-slider {
            height: 580px;
          }

          .hero-slide {
            height: 580px;
            background-position: center;
          }

          .hero-content {
            margin: 0 25px;
            max-width: 80%;
          }

          .hero-content h1 {
            font-size: 38px;
          }

          .hero-content h5 {
            font-size: 22px;
          }

          .hero-content p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .hero-line {
            width: 80px;
            margin-bottom: 20px;
          }

          .hero-btn {
            padding: 14px 35px;
            font-size: 17px;
          }

          .hero-arrow {
            width: 45px;
            height: 45px;
            font-size: 22px;
          }

          .hero-next {
            right: 10px;
          }

          .hero-dots {
            bottom: 25px;
          }
        }
      `}</style>

      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              index === current ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>

              <h5>{slide.subtitle}</h5>

              <div className="hero-line"></div>

              <p>{slide.description}</p>

              <Link to="/Shop" className="hero-btn">
                Shop Now
              </Link>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="hero-arrow hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`hero-dot ${
                index === current ? "active" : ""
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;