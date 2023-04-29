import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider({ pieces, title }) {
    const artworks = Array.from(pieces);
    return (
        <Swiper
            modules={[Navigation, A11y, Pagination, Scrollbar]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="naviSlider"
        >
            {artworks.map(artwork => (
                <SwiperSlide className="swiperSlide">
                    <img src={artwork} alt={title} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider;