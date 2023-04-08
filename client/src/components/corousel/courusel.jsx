import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
    const images = [
        'https://images.squarespace-cdn.com/content/v1/5e185abfc76307064fbf9623/1578914963579-CSW1B0UND2JVCGTJPIAK/image.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5e185abfc76307064fbf9623/1589281956978-9V8K93X7HQGXPAJNGYAA/image.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5ef37732b5c27532502a5de8/1594131251935-9YT113Q0D2A5T3AQCW8M/Transparent_Black+Logo.png?format=1500w',
        'https://images.squarespace-cdn.com/content/v1/5e185abfc76307064fbf9623/1578742786390-59XQYQLBWSC3T9YII6FB/OfficeSpace_inside_1.jpg?format=1500w',
        'https://images.squarespace-cdn.com/content/v1/5e185abfc76307064fbf9623/1578914963579-CSW1B0UND2JVCGTJPIAK/image.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5e185abfc76307064fbf9623/1589281956978-9V8K93X7HQGXPAJNGYAA/image.jpg?format=2500w',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dotsClass: 'slick-dots',
    };

    return (
        <div style= {{width:"80%",margin:"auto",marginTop:"80px",textAlign:"center"}}>
            <Slider {...settings}>
                {images.map((image) => (
                    <div key={image}>
                        <img width="80%"  style={{margin:"auto",height:"350px",objectFit:"cover"}} src={image} alt='' />
                    </div>
                ))}
            </Slider>
        </div>

    );
};

export default ImageCarousel;
