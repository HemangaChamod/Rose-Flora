import { useState } from "react";

function Hero() {
  const slides = [
    {
      image: "/img/slider/3.jpeg",
      title: "Fresh Flower",
      subtitle: "Natural & Beautiful Flower Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
    },
    {
      image: "/img/slider/1.jpeg",
      title: "Fresh Flower",
      subtitle: "Natural & Beautiful Flower Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <style>{`
        .hero-slider{
            position:relative;
            width:100%;
            height:780px;
            overflow:hidden;
        }

        .hero-slide{
            width:100%;
            height:750px;
            background-size:cover;
            background-position:center;
            display:flex;
            align-items:center;
        }

        .hero-content{
            max-width:560px;
            margin-left:120px;
        }

        .hero-content h1{
            font-size:82px;
            font-weight:700;
            color:#2f2f2f;
            margin-bottom:10px;
        }

        .hero-content h5{
            font-size:32px;
            color:#666;
            margin-bottom:25px;
            font-weight:400;
        }

        .hero-line{
            width:120px;
            height:3px;
            background:#e54d74;
            margin-bottom:30px;
        }

        .hero-content p{
            font-size:18px;
            color:#555;
            line-height:1.8;
            margin-bottom:45px;
        }

        .hero-btn{
            display:inline-block;
            background:#e54d74;
            color:#fff;
            padding:18px 50px;
            border-radius:40px;
            text-decoration:none;
            font-size:20px;
            font-weight:600;
            transition:.3s;
        }

        .hero-btn:hover{
            background:#d93863;
            color:white;
        }

        .hero-arrow{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            width:65px;
            height:65px;
            background:white;
            border:1px solid #ddd;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            font-size:30px;
            transition:.3s;
            z-index:10;
        }

        .hero-arrow:hover{
            background:#e54d74;
            color:white;
        }

        .hero-prev{
            left:60px;
        }

        .hero-next{
            right:60px;
        }

        @media(max-width:992px){

            .hero-content{
                margin:0 30px;
                max-width:100%;
            }

            .hero-content h1{
                font-size:48px;
            }

            .hero-content h5{
                font-size:24px;
            }

            .hero-content p{
                font-size:18px;
            }

            .hero-slide{
                background-position:center;
            }

            .hero-prev{
                left:20px;
            }

            .hero-next{
                right:20px;
            }

        }
      `}</style>

      <section className="hero-slider">

        <div
          className="hero-slide"
          style={{
            backgroundImage: `url(${slides[current].image})`,
          }}
        >
          <div className="hero-content">

            <h1>{slides[current].title}</h1>

            <h5>{slides[current].subtitle}</h5>

            <div className="hero-line"></div>

            <p>{slides[current].description}</p>

            <a href="#" className="hero-btn">
              Shop Now
            </a>

          </div>
        </div>
          {/*
        <div className="hero-arrow hero-prev" onClick={prevSlide}>
          &#10094;
        </div>
        */}

        <div className="hero-arrow hero-next" onClick={nextSlide}>
          &#10095;
        </div>

      </section>
    </>
  );
}

export default Hero;